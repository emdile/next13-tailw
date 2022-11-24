const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['moti']);

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack5: true,
	experimental: {
		forceSwcTransforms: true,
		appDir: true,
	},
};

module.exports = withPlugins([withTM], nextConfig);
