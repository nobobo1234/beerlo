import {
  invalidateSession,
  deleteSessionTokenCookie,
} from "$lib/server/session";
import { redirect, fail } from "@sveltejs/kit";
import type { ServerLoad, Actions } from "@sveltejs/kit";

export const load: ServerLoad = async (event) => {
  if (!event.locals.player) {
    return redirect(302, "/login");
  }

  return {
    user: event.locals.player,
  };
};

export const actions: Actions = {
  logout: async (event) => {
    if (event.locals.session === null) {
      return fail(401);
    }

    await invalidateSession(event.locals.session.id);
    deleteSessionTokenCookie(event);
    return redirect(302, "/login");
  },
};
