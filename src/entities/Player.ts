import { TranslationsService } from "@api";
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

	async getTitle(language = "en"): Promise<Title> {
		// TODO DI this
		const result = await TranslationsService.fetchFields({
			fields: [`T_${this.title}`],
			language,
		});
		return {
			id: this.title,
			title: this.resolveTitleGender(result.data[`t_${this.title}`]),
		};
	}

	async getTitles(language = "en"): Promise<Title[]> {
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

		return titles;
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
