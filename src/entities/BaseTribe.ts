export interface BaseTribeProps {
	id: number;
	name: string;
}

export class BaseTribeEntity implements BaseTribeProps {
	id!: number;
	name!: string;

	constructor(props: BaseTribeProps) {
		Object.assign(this, props);
	}
}
