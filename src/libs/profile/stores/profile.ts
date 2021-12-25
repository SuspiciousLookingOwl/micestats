import type { PlayerEntity } from "@entities";
import { writable } from "svelte/store";

export const profile = writable<PlayerEntity | null>(null);
