export interface BasePlayerProps {
	id: number;
	name: string;
	cfmRoles: string[];
	tfmRoles: string[];
}

export class BasePlayerEntity implements BasePlayerProps {
	id!: number;
	name!: string;
	cfmRoles!: string[];
	tfmRoles!: string[];

	constructor(props: BasePlayerProps) {
		Object.assign(this, props);
	}

	get atelierProfileUrl(): string {
		return `https://atelier801.com/profile?pr=${this.name.replace("#", "%23")}`;
	}

	get slugUsername(): string {
		return this.name.replace("#", "-");
	}

	get avatarUrl(): string {
		const lastId = this.id % 10000;
		return `https://avatars.atelier801.com/${lastId}/${this.id}.jpg`;
	}

	get avatarUrlMin(): string {
		const lastId = this.id % 10000;
		return `https://avatars.atelier801.com/${lastId}/${this.id}_50.jpg`;
	}
}
