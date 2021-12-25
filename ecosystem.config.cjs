module.exports = [
	{
		script: "dist/index.js",
		name: "app",
		exec_mode: "cluster_mode",
		instances: 2,
		env_production: {
			NODE_ENV: "production",
		},
		env_development: {
			NODE_ENV: "development",
		},
	},
];
