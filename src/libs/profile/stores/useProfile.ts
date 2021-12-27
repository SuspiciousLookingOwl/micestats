import { PlayersService } from "@api";
import { PlayerEntity } from "@entities";
import { useFetch } from "@stores";
import dayjs from "dayjs";
import { get, writable, type Writable } from "svelte/store";

type UseProfileValue = PlayerEntity | null;

interface UseProfile {
	fetch: () => Promise<UseProfileValue | undefined>;
	profile: Writable<UseProfileValue>;
	username: Writable<string>;
	isFetchingProfile: Writable<boolean>;
}

export async function fetchProfile(name: string): Promise<UseProfileValue> {
	if (!name) return null;
	const response = await PlayersService.getById(name, {
		start: dayjs(new Date()).subtract(7, "day"),
		recent: true,
	});
	if (response.status !== 200) return null;
	return new PlayerEntity(response.data);
}

export const useProfile = (
	initialUsername?: string,
	initialProfile: UseProfileValue = null
): UseProfile => {
	const username = writable<string>(initialUsername);

	const {
		value: profile,
		isFetching: isFetchingProfile,
		fetch,
	} = useFetch<UseProfileValue>(initialProfile, () => fetchProfile(get(username)), {
		keys: [username],
		condition: (p) => {
			const storedSlug = p?.slugName;
			const currentUsername = get(username);

			return storedSlug !== currentUsername;
		},
	});

	return {
		profile,
		isFetchingProfile,
		username,
		fetch,
	};
};
