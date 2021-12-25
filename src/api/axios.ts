import { browser, dev } from "$app/env";
import axios from "axios";
import caseConverter from "axios-case-converter";
import qs from "qs";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Use default import if running on server
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const applyCaseMiddleware = dev || browser ? caseConverter : (caseConverter as any).default;

const api = applyCaseMiddleware(
	axios.create({
		baseURL: API_BASE_URL,
		paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
	})
);

// Prevent axios from throwing error on error status
api.defaults.validateStatus = function () {
	return true;
};

export default api;
