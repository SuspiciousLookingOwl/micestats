import { BasePlayerEntity, type BasePlayerProps } from "./BasePlayer";
import { BaseTribeEntity, type BaseTribeProps } from "./BaseTribe";

export interface LeaderboardProps {
	cheese: number;
	rounds: number;
	bootcamp: number;
	finished: number;

	// racing
	first: number;
	podium: number;

	// shaman
	savesDivine: number;
	savesHard: number;
	savesNormal: number;

	// racing
	killed: number;
	shaman: number;
	survivor: number;
	score: number;

	//defilante
	points: number;
}

export class LeaderboardEntity implements LeaderboardProps {
	cheese!: number;
	rounds!: number;
	bootcamp!: number;
	finished!: number;

	// racing
	first!: number;
	podium!: number;

	// shaman
	savesDivine!: number;
	savesHard!: number;
	savesNormal!: number;

	// racing
	killed!: number;
	shaman!: number;
	survivor!: number;
	score!: number;

	//defilante
	points!: number;

	constructor(props: LeaderboardProps) {
		Object.assign(this, props);
	}
}

export class PlayerLeaderboardEntity extends LeaderboardEntity {
	player!: BasePlayerEntity;

	constructor(props: LeaderboardProps & BasePlayerProps) {
		super(props);
		this.player = new BasePlayerEntity(props);
	}

	get target(): BasePlayerEntity {
		return this.player;
	}
}

export class TribeLeaderboardEntity extends LeaderboardEntity {
	tribe!: BaseTribeEntity;

	constructor(props: LeaderboardProps & BaseTribeProps) {
		super(props);
		this.tribe = new BaseTribeEntity(props);
	}

	get target(): BaseTribeEntity {
		return this.tribe;
	}
}
