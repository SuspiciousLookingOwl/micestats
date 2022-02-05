<script lang="ts" context="module">
	export interface HeatmapData<T = any> {
		date: Date;
		value: number;
		data?: T;
	}

	export type HeatmapColorSchema = [number, string][];

	export interface HeatmapSanitizedData<T> {
		week: string;
		day: string;
		date: Date;
		data?: T;
		value: number;
	}

	export interface HeatmapTooltip<T> {
		left: number;
		top: number;
		data: HeatmapData<T> | null;
		visible: boolean;
	}
</script>

<script lang="ts">
	import classNames from "classnames";
	import * as d3 from "d3";

	type DataType = $$Generic;
	type SanitizedData = HeatmapSanitizedData<DataType>;
	type Tooltip = HeatmapTooltip<DataType>;

	//#region props
	let partialData: HeatmapData<DataType>[] = [];
	export { partialData as data };
	export let margin = { top: 24, right: 0, bottom: 0, left: 30 };
	export let colors: HeatmapColorSchema = [];
	export let width = 768 - margin.left - margin.right;
	export let height = width / 6 - margin.top - margin.bottom;
	export let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	export let months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	//#endregion

	//#region state
	let chart: HTMLDivElement;
	let tooltip: Tooltip = {
		left: 0,
		top: 0,
		data: null,
		visible: false,
	};
	//#endregion

	//#region methods
	// Convert the date and value to the format that D3 understands
	const sanitize = ({ date, data, value }: HeatmapData<DataType>): SanitizedData => {
		const year = date.getFullYear();
		const oneJan = new Date(year, 0, 1);
		let week = Math.ceil(
			((date.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7
		);
		if (date.getDay() === 6) week--;
		return {
			date,
			data,
			day: days[date.getDay()],
			week:
				week === 53 && new Date().getFullYear() != year
					? `1_${year + 1}`
					: `${week}_${year}`,
			value,
		};
	};

	const sameDay = (d1: Date, d2: Date) => {
		return (
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()
		);
	};
	//#endregion

	// generate chart
	$: if (partialData && colors && chart) {
		const fullData: HeatmapData<DataType>[] = [...Array(365)]
			.map((_, i) => {
				const date = new Date();
				date.setDate(date.getDate() - i);
				const d = partialData.find((d) => sameDay(d.date, date));
				return {
					date,
					value: d?.value || 0,
					data: d?.data,
				};
			})
			.reverse();

		const sanitized = fullData.map(sanitize);
		const weeks = [...new Set(sanitized.map((s) => s.week))];
		chart.innerHTML = "";

		// Base
		const svg = d3
			.select(chart)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Build X & Y scales and axis:
		const x = d3.scaleBand().range([0, width]).domain(weeks).padding(0.18);
		const y = d3.scaleBand().range([height, 0]).domain(days.slice().reverse()).padding(0.2);

		// Left label
		svg.append("g")
			.call(d3.axisLeft(y).tickSize(0).tickPadding(6))
			.call((g) => g.select(".domain").remove());

		// Top label
		const monthsLabel = weeks.map((w) => {
			const data = sanitized.find((s) => s.week === w && s.date.getDate() === 1);
			if (data) return months[data.date.getMonth()];
			else return (Math.random() + 1).toString(36).substring(7); // will be hidden
		});
		const labels = d3
			.axisTop(d3.scaleBand().range([0, width]).domain(monthsLabel))
			.tickValues(monthsLabel.filter((d) => d.length === 3))
			.tickSize(0)
			.tickPadding(6);
		svg.append("g")
			.attr("transform", `translate(0, 0)`)
			.call(labels)
			.call((g) => g.select(".domain").remove());

		// Color scale
		const domain = colors.map((c) => c[0]);
		const range = colors.map((c) => c[1]);
		const colorScale = d3
			.scaleLinear()
			.range(range as any)
			.domain(domain);

		// Render
		svg.selectAll()
			.data(sanitized, (d) => d?.week + ":" + d?.day)
			.join("rect")
			.attr("rx", 2)
			.attr("ry", 2)
			.attr("x", (d) => x(d.week) || "")
			.attr("y", (d) => y(d.day) || "")
			.attr("width", x.bandwidth())
			.attr("height", y.bandwidth())
			.style("fill", (d) => colorScale(d.value))
			.on("mouseover", () => (tooltip.visible = true))
			.on("mousemove", (e: MouseEvent, { data, date, value }: SanitizedData) => {
				tooltip = {
					left: e.clientX,
					top: e.clientY - 25,
					data: { date, value, data },
					visible: true,
				};
			})
			.on("mouseleave", () => (tooltip.visible = false));
	}

	//#region classes
	$: tooltipClass = classNames("fixed z-10", {
		visible: tooltip.visible,
		invisible: !tooltip.visible,
	});
	//#endregion
</script>

<div class={tooltipClass} style={`left: ${tooltip.left}px; top: ${tooltip.top}px`}>
	{#if tooltip.data?.value}
		<slot name="tooltip" data={tooltip.data} />
	{/if}
</div>

<div class="overflow-x-hidden max-w-full inline-block">
	<div bind:this={chart} class="float-right" />
</div>
