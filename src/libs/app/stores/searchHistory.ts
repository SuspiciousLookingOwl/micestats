import { BasePlayerEntity } from "@entities";
import { persistent } from "@stores";
import { get, writable } from "svelte/store";

const useSearchHistory = (limit = 5) => {
	const history = persistent(writable<BasePlayerEntity[]>([]), "searchHistory");

	// converting props to entity
	history.set(get(history).map((h) => new BasePlayerEntity(h)));

	const push = (player: BasePlayerEntity) => {
		const current = get(history);

		const existingIndex = current.findIndex((p) => p.id === player.id);
		if (existingIndex >= 0) current.splice(existingIndex, 1);

		current.unshift(player);
		current.splice(limit);
		history.set(current);
	};

	return {
		subscribe: history.subscribe,
		set: history.set,
		push,
	};
};

export const searchHistory = useSearchHistory();
