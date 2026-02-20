import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { reactRouterDevTools } from "react-router-devtools"
import { defineConfig } from "vite"
import babel from "vite-plugin-babel"
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	plugins: [
		reactRouterDevTools(),
		reactRouter(),
		tailwindcss(),
		// Run the react-compiler on .tsx files only when bundling
		{
			...babel({
				filter: /\.(ts|tsx)$/,
				babelConfig: {
					presets: ["@babel/preset-typescript"],
					plugins: ["babel-plugin-react-compiler"],
				},
			}),
			apply: "build",
		},
		tsconfigPaths(),
		iconsSpritesheet({
			inputDir: "./resources/icons",
			outputDir: "./app/library/icon/icons",
			fileName: "icon.svg",
			withTypes: true,
			formatter: "biome",
		}),
	],
	server: {
		open: true,
		// biome-ignore lint/style/noProcessEnv: Its ok to use process.env here
		port: Number(process.env.PORT || 4280),
	},
})
