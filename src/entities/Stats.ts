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

interface Ratio {
	shaman: Omit<Shaman, "experience">;
	mouse: Omit<Mouse, "bootcamp" | "rounds">;
	survivor: Omit<Survivor, "rounds">;
	racing: Omit<Racing, "rounds">;
	defilante: Omit<Defilante, "rounds">;
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

	get ratio(): Ratio {
		return {
			defilante: {
				finished: this.defilante.finished / this.defilante.rounds || 0,
				points: this.defilante.points / this.defilante.rounds || 0,
			},
			mouse: {
				first: this.mouse.first / this.mouse.rounds || 0,
				cheese: this.mouse.cheese / this.mouse.rounds || 0,
			},
			racing: {
				finished: this.racing.finished / this.racing.rounds || 0,
				first: this.racing.first / this.racing.rounds || 0,
				podium: this.racing.podium / this.racing.rounds || 0,
			},
			shaman: {
				cheese: this.shaman.cheese / this.mouse.rounds || 0,
				savesNormal: this.shaman.savesNormal / this.mouse.rounds || 0,
				savesHard: this.shaman.savesHard / this.mouse.rounds || 0,
				savesDivine: this.shaman.savesDivine / this.mouse.rounds || 0,
			},
			survivor: {
				killed: this.survivor.killed / this.survivor.rounds || 0,
				shaman: this.survivor.shaman / this.survivor.rounds || 0,
				survivor: this.survivor.survivor / this.survivor.rounds || 0,
			},
		};
	}

	toProps(): StatsProps {
		return {
			shaman: this.shaman,
			mouse: this.mouse,
			survivor: this.survivor,
			racing: this.racing,
			defilante: this.defilante,
			score: this.score,
		};
	}
}

export class PeriodStatsEntity extends StatsEntity {
	start!: string;
	end!: string;

	constructor(props: PeriodStatsProps) {
		super(props);
		Object.assign(this, props);
	}

	toProps(): PeriodStatsProps {
		return {
			...super.toProps(),
			start: this.start,
			end: this.end,
		};
	}
}
