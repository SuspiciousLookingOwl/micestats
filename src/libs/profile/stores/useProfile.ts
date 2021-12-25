import { PlayersService } from "@api";
import { PlayerEntity } from "@entities";
import { useFetch } from "@stores";
import dayjs from "dayjs";
import { get, writable, type Writable } from "svelte/store";

interface UseProfile {
	fetch: () => Promise<PlayerEntity | null>;
	profile: Writable<PlayerEntity | null>;
	username: Writable<string>;
	isFetchingProfile: Writable<boolean>;
}

export async function fetchProfile(name: string): Promise<PlayerEntity | null> {
	if (!name) return null;
	const response = await PlayersService.getById(name, {
		start: dayjs(new Date()).subtract(7, "day"),
		recent: true,
	});
	if (response.status !== 200) return null;
	return new PlayerEntity(response.data);
}

export const useProfile = (initialUsername?: string): UseProfile => {
	const username = writable<string>(initialUsername);

	const {
		value: profile,
		isFetching: isFetchingProfile,
		fetch,
	} = useFetch<PlayerEntity | null>(null, () => fetchProfile(get(username)), {
		keys: [username],
		strict: true,
	});

	return {
		profile,
		isFetchingProfile,
		username,
		fetch,
	};
};
