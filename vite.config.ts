import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { reactRouterDevTools } from "react-router-devtools"
import { defineConfig } from "vite"
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet"
import tsconfigPaths from "vite-tsconfig-paths"

const isStorybook = process.argv[1]?.includes("storybook") && process.argv[1]?.includes("node_modules")
export default defineConfig({
	plugins: [tailwindcss(), reactRouterDevTools(), !isStorybook && reactRouter(), tsconfigPaths()],
	server: {
		open: true,
		// biome-ignore lint/style/noProcessEnv: Its ok to use process.env here
		port: Number(process.env.PORT || 4280),
	},
})
