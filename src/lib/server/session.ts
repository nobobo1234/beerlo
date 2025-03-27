import { prisma } from "../../../prisma/db";
import type { Player, Session } from "../../../prisma/client";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Generates a random session token
 * @returns A random session token
 */
export function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
}

/**
 * Creates a new session for a player
 * @param token The session token
 * @param playerId The player's ID
 * @returns The created session
 */
export async function createSession(
  token: string,
  playerId: string
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

  const session = await prisma.session.create({
    data: {
      id: sessionId,
      playerId,
      expiresAt,
    },
  });

  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      player: true,
    },
  });

  // If the session is not found, return null
  if (result === null) {
    return { session: null, player: null };
  }

  const { player, ...session } = result;

  // If the session is expired, return null
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });
    return { session: null, player: null };
  }

  // Optionally extend session expiration if it's close to expiring
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 7) {
    // if less than 7 days left
    await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // extend by 30 days
      },
    });
  }

  return { session, player };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
}

export async function invalidateAllSessions(playerId: string): Promise<void> {
  await prisma.session.deleteMany({
    where: {
      playerId,
    },
  });
}

export function setSessionTokenCookie(
  event: RequestEvent,
  token: string,
  expiresAt: Date
) {
  event.cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export type SessionValidationResult =
  | { session: Session; player: Player }
  | { session: null; player: null };
