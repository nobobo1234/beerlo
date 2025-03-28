import { prisma, type Player } from "./db";

export async function getUserFromGoogleId(
  googleId: string
): Promise<Player | null> {
  return prisma.player.findUnique({
    where: { googleId },
  });
}

export async function createUser(
  googleId: string,
  name: string
): Promise<Player> {
  return prisma.player.create({
    data: {
      googleId,
      name,
      elo: 1000,
    },
  });
}
