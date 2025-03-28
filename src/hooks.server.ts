import {
  validateSessionToken,
  setSessionTokenCookie,
  deleteSessionTokenCookie,
} from "./lib/server/session";

import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("session") ?? null;

  if (token === null) {
    event.locals.player = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, player } = await validateSessionToken(token);
  if (session !== null) {
    setSessionTokenCookie(event, token, session.expiresAt);
  } else {
    deleteSessionTokenCookie(event);
  }

  event.locals.player = player;
  event.locals.session = session;
  return resolve(event);
};
