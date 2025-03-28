import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/db";

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      select: {
        id: true,
        name: true,
        elo: true,
      },
    });
    return json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    return json({ error: "Failed to fetch players" }, { status: 500 });
  }
}
