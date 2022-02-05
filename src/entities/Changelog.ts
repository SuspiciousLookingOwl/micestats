import { BaseTribeEntity, type BaseTribeProps } from "./BaseTribe";
import { PlayerEntity, type PlayerProps } from "./Player";

type ChangelogValue = {
	date: Date;
	value: number;
};

export interface ChangelogProps {
	mouse: {
		bootcamp: ChangelogValue[];
		cheese: ChangelogValue[];
		first: ChangelogValue[];
		rounds: ChangelogValue[];
	};

	racing: {
		finished: ChangelogValue[];
		first: ChangelogValue[];
		podium: ChangelogValue[];
		rounds: ChangelogValue[];
	};

	shaman: {
		cheese: ChangelogValue[];
		experience: ChangelogValue[];
		savesDivine: ChangelogValue[];
		savesHard: ChangelogValue[];
		savesNormal: ChangelogValue[];
	};

	survivor: {
		killed: ChangelogValue[];
		shaman: ChangelogValue[];
		survivor: ChangelogValue[];
		rounds: ChangelogValue[];
	};

	defilante: {
		finished: ChangelogValue[];
		points: ChangelogValue[];
		rounds: ChangelogValue[];
	};
}

export class ChangelogEntity implements ChangelogProps {
	mouse!: {
		bootcamp: ChangelogValue[];
		cheese: ChangelogValue[];
		first: ChangelogValue[];
		rounds: ChangelogValue[];
	};

	racing!: {
		finished: ChangelogValue[];
		first: ChangelogValue[];
		podium: ChangelogValue[];
		rounds: ChangelogValue[];
	};

	shaman!: {
		cheese: ChangelogValue[];
		experience: ChangelogValue[];
		savesDivine: ChangelogValue[];
		savesHard: ChangelogValue[];
		savesNormal: ChangelogValue[];
	};

	survivor!: {
		killed: ChangelogValue[];
		shaman: ChangelogValue[];
		survivor: ChangelogValue[];
		rounds: ChangelogValue[];
	};

	defilante!: {
		finished: ChangelogValue[];
		points: ChangelogValue[];
		rounds: ChangelogValue[];
	};

	constructor(props: ChangelogProps) {
		Object.assign(this, props);
	}
}

export class PlayerChangelogEntity extends ChangelogEntity {
	player!: PlayerEntity;

	constructor(props: ChangelogProps & PlayerProps) {
		super(props);
		this.player = new PlayerEntity(props);
	}

	get target(): PlayerEntity {
		return this.player;
	}
}

export class TribeChangelogEntity extends ChangelogEntity {
	tribe!: BaseTribeEntity;

	constructor(props: ChangelogProps & BaseTribeProps) {
		super(props);
		this.tribe = new BaseTribeEntity(props);
	}

	get target(): BaseTribeEntity {
		return this.tribe;
	}
}
