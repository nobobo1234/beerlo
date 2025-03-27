// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Player, Session } from "./lib/server/db";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      player: Player | null;
      session: Session | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
