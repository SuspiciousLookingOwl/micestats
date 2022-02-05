import { PlayerChangelogTypes, PlayersService, TranslationsService } from "@api";
import { getLevel } from "@utils";
import {
	BasePlayerEntity,
	BaseTribeEntity,
	PeriodStatsEntity,
	StatsEntity,
	type BasePlayerProps,
	type BaseTribeProps,
	type PeriodStatsProps,
	type StatsProps,
} from ".";
import { ChangelogEntity } from "./Changelog";

interface ShopProps {
	look: string;
	outfits: string[];
	mouseColor: number;
	shamanColor: number;
}

interface Title {
	id: number;
	title: string;
}

class ShopEntity {
	look!: string;
	outfits!: string[];
	mouseColor!: number;
	shamanColor!: number;

	constructor(props: ShopProps) {
		Object.assign(this, props);
	}

	get outfitUrls(): string[] {
		// TODO DI this
		return this.outfits.map((o) => `${import.meta.env.VITE_API_BASE_URL}/dressroom/mouse/${o}`);
	}

	toProps(): ShopProps {
		return {
			look: this.look,
			outfits: this.outfits,
			mouseColor: this.mouseColor,
			shamanColor: this.shamanColor,
		};
	}
}

export interface PlayerProps extends BasePlayerProps {
	registration: string;
	gender: "male" | "female" | null;
	title: number;
	tribe: BaseTribeProps | null;
	soulmate: BasePlayerProps | null;
	shop: {
		look: string;
		outfits: string[];
		mouseColor: number;
		shamanColor: number;
	};
	badges: string[];
	titles: string[];
	stats: StatsProps;
	disqualified: boolean;
	canQualify: boolean;
	period: PeriodStatsProps;
}

export class PlayerEntity extends BasePlayerEntity {
	registration!: string;
	gender!: "male" | "female" | null;
	title!: number;
	tribe!: BaseTribeEntity | null;
	soulmate!: BasePlayerEntity | null;
	shop!: ShopEntity;
	badges!: string[];
	titles!: string[];
	stats!: StatsEntity;
	disqualified!: boolean;
	canQualify!: boolean;
	period!: PeriodStatsEntity;

	#title?: Title;
	#titles?: Title[];
	#changelogs?: ChangelogEntity;

	constructor(props: PlayerProps) {
		super(props);

		const { tribe, soulmate, stats, period, shop, ...rest } = props;
		Object.assign(this, rest);

		this.tribe = tribe ? new BaseTribeEntity(tribe) : null;
		this.soulmate = soulmate ? new BasePlayerEntity(soulmate) : null;
		this.shop = new ShopEntity(shop);
		this.stats = new StatsEntity(stats);
		this.period = new PeriodStatsEntity(period);
	}

	get outfitUrl(): string {
		// TODO DI this
		return `${import.meta.env.VITE_API_BASE_URL}/dressroom/mouse/${this.shop.look}`;
	}

	get headUrl(): string {
		// TODO DI this
		return `${import.meta.env.VITE_API_BASE_URL}/dressroom/mouse/${this.shop.look}?head`;
	}

	get level(): number {
		return getLevel(this.stats.shaman.experience);
	}

	get registrationDate(): string {
		return this.registration.split("T")[0].split("-").reverse().join("/");
	}

	async getTitle(language = "en"): Promise<Title> {
		if (this.#title) return this.#title;

		// TODO DI this
		const result = await TranslationsService.fetchFields({
			fields: [`T_${this.title}`],
			language,
		});

		const title = {
			id: this.title,
			title: this.resolveTitleGender(result.data[`t_${this.title}`]),
		};
		this.#title = title;

		return title;
	}

	async getTitles(language = "en"): Promise<Title[]> {
		if (this.#titles) return this.#titles;

		// TODO DI this
		const result = await TranslationsService.fetchFields({
			fields: this.titles.map((t) => `T_${t}`),
			language,
		});

		let titles = Object.entries(result.data).map(([id, title]) => ({
			id: +id.split("_")[1],
			title: this.resolveTitleGender(title),
		}));

		// sort by id
		titles = titles.sort((a, b) => +a.id - +b.id);
		this.#titles = titles;

		return titles;
	}

	async getChangelogs(): Promise<ChangelogEntity> {
		if (this.#changelogs) return this.#changelogs;

		const rawChangelog = await PlayersService.getChangelogs(this.id, [
			PlayerChangelogTypes.Shaman,
			PlayerChangelogTypes.Mouse,
			PlayerChangelogTypes.Racing,
			PlayerChangelogTypes.Survivor,
			PlayerChangelogTypes.Defilante,
		]);

		const { mouse, racing, shaman, survivor, defilante, dates, ...rest } = rawChangelog;

		const parse = (
			[dateIndex, value]: [number, number | string],
			i: number,
			array: [number, number | string][]
		) => {
			const previous = +(array[i + 1]?.[1] || 0);
			return {
				date: new Date(dates[dateIndex]),
				value: Math.max(previous ? +value - +previous : +value, 0),
			};
		};

		const changelogProps = {
			mouse: {
				bootcamp: mouse?.bootcamp.map(parse) || [],
				cheese: mouse?.cheese.map(parse) || [],
				rounds: mouse?.rounds.map(parse) || [],
				first: mouse?.first.map(parse) || [],
			},
			racing: {
				finished: racing?.finished.map(parse) || [],
				first: racing?.first.map(parse) || [],
				podium: racing?.podium.map(parse) || [],
				rounds: racing?.rounds.map(parse) || [],
			},
			shaman: {
				cheese: shaman?.cheese.map(parse) || [],
				experience: shaman?.experience.map(parse) || [],
				savesDivine: shaman?.savesDivine.map(parse) || [],
				savesHard: shaman?.savesHard.map(parse) || [],
				savesNormal: shaman?.savesNormal.map(parse) || [],
			},
			survivor: {
				killed: survivor?.killed.map(parse) || [],
				shaman: survivor?.shaman.map(parse) || [],
				survivor: survivor?.survivor.map(parse) || [],
				rounds: survivor?.rounds.map(parse) || [],
			},
			defilante: {
				finished: defilante?.finished.map(parse) || [],
				points: defilante?.points.map(parse) || [],
				rounds: defilante?.rounds.map(parse) || [],
			},
		};

		const changelogs = new ChangelogEntity({ ...changelogProps, ...rest });
		this.#changelogs = changelogs;
		return changelogs;
	}

	toProps(): PlayerProps {
		const { tribe, soulmate, stats, period, shop, ...rest } = this;

		return {
			...rest,
			tribe: tribe?.toProps() || null,
			soulmate: soulmate?.toProps() || null,
			stats: stats.toProps(),
			period: period.toProps(),
			shop: shop.toProps(),
		};
	}

	private resolveTitleGender(title: string): string {
		const genderGroup = this.gender === "female" ? "$2" : "$1";
		return title.replace(/\((.*|)\|(|.*)\)/g, genderGroup);
	}
}
