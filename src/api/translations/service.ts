import type { AxiosResponse } from "axios";
import { axios } from "../";
import type { FieldRequest, TranslationFields } from "./interfaces";

const BASE = "/translation";

export default class Translations {
	static async fetchFields(
		opt: Partial<FieldRequest>
	): Promise<AxiosResponse<TranslationFields>> {
		const params = {
			start: opt.start,
			all: opt.all,
		};
		return await axios.post(`${BASE}/${opt.language || "en"}`, opt.fields, { params });
	}

	static withGender(text: string, gender: "male" | "female"): string {
		const option = gender === "male" ? "$1" : "$2";
		return text.replace(/\((.*?)\|(.*?)\)/g, option);
	}
}
