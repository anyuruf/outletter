import path from "node:path"
import { fileURLToPath } from "node:url"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		css: true,
		coverage: {
			include: ["app/**"],
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
		},
		projects: [
			{
				extends: true,
				test: {
					name: "server tests",
					environment: "node",
					// Include generic .test files that should work anywhere and .server.test files for server only, ignore .browser.test
					include: ["./**/*.server.test.{ts,tsx}", "!./**/*.browser.test.{ts,tsx}", "./**/*.test.{ts,tsx}"],
				},
			},
			{
				extends: true,
				optimizeDeps: {
					include: ["react/jsx-dev-runtime"],
				},
				server: {
					fs: {
						strict: false,
					},
				},
				test: {
					includeTaskLocation: true,
					// Include generic .test files that should work anywhere and .browser.test files for browser only, ignore .server.test
					include: ["./**/*.test.{ts,tsx}", "./**/*.browser.test.{ts,tsx}", "!./**/*.server.test.{ts,tsx}"],
					setupFiles: ["./tests/setup.browser.tsx"],
					name: "browser tests",
					browser: {
						enabled: true,
						instances: [
							{
								browser: "chromium",
							},
						],
						provider: playwright(),
					},
				},
			},
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, ".storybook"),
					}),
				],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [
							{
								browser: "chromium",
							},
						],
					},
					setupFiles: [".storybook/vitest.setup.ts"],
				},
			},
		],
	},
})
