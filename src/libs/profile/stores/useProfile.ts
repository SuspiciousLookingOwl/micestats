import { PlayersService } from "@api";
import { PlayerEntity } from "@entities";
import { useFetch } from "@stores";
import dayjs from "dayjs";
import type { Writable } from "svelte/store";

interface UseProfile {
	fetch: () => void;
	profileValue: Writable<PlayerEntity | null>;
	isFetchingProfile: Writable<boolean>;
}

async function fetchProfile(name: string): Promise<PlayerEntity | null> {
	const response = await PlayersService.getById(name, {
		start: dayjs(new Date()).subtract(7, "day"),
		recent: true,
	});
	if (response.status !== 200) return null;
	return new PlayerEntity(response.data);
}

export const useProfile = (
	username: string,
	initialValue: PlayerEntity | null = null
): UseProfile => {
	username = initialValue?.name || username;

	const {
		value: profileValue,
		isFetching: isFetchingProfile,
		...profile
	} = useFetch<PlayerEntity | null>(initialValue || null, () => fetchProfile(username));

	return {
		profileValue,
		isFetchingProfile,
		...profile,
	};
};
