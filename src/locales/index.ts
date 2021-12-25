import en from "./en.json";

// RTL support
interface Container {
	[key: string]: string | Container;
}

function addRLM(fields: Container) {
	// https://en.wikipedia.org/wiki/Right-to-left_mark
	for (const field in fields) {
		const value = fields[field];
		if (typeof value !== "string") {
			addRLM(value);
		} else {
			fields[field] += "\u200F";
		}
	}
}

const rtlLanguages: Container[] = [];
for (let idx = 0; idx < rtlLanguages.length; idx++) {
	addRLM(rtlLanguages[idx] as Container);
}

export default {
	en,
};
