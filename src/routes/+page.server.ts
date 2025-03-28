import {
  invalidateSession,
  deleteSessionTokenCookie,
} from "$lib/server/session";
import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async (event) => {
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
