interface Mouse {
	rounds: number;
	cheese: number;
	first: number;
	bootcamp: number;
}

interface Defilante {
	rounds: number;
	finished: number;
	points: number;
}

interface Racing {
	rounds: number;
	finished: number;
	first: number;
	podium: number;
}

interface Shaman {
	cheese: number;
	savesDivine: number;
	savesNormal: number;
	savesHard: number;
	experience: number;
}

interface Survivor {
	rounds: number;
	killed: number;
	shaman: number;
	survivor: number;
}

interface Scores {
	stats: number;
	shaman: number;
	survivor: number;
	racing: number;
	defilante: number;
	overall: number;
}

export interface StatsProps {
	shaman: Shaman;
	mouse: Mouse;
	survivor: Survivor;
	racing: Racing;
	defilante: Defilante;
	score: Scores;
}

export type PeriodStatsProps = StatsProps & {
	start: string;
	end: string;
};

export class StatsEntity {
	shaman!: Shaman;
	mouse!: Mouse;
	survivor!: Survivor;
	racing!: Racing;
	defilante!: Defilante;
	score!: Scores;

	constructor(props: StatsProps) {
		Object.assign(this, props);
	}
}

export class PeriodStatsEntity extends StatsEntity {
	start!: string;
	end!: string;

	constructor(props: PeriodStatsProps) {
		super(props);
		Object.assign(this, props);
	}
}
