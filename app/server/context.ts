import type { Context } from "hono"
import { createContext, RouterContextProvider } from "react-router"
import { i18next } from "remix-hono/i18next"
import { getClientEnv, getServerEnv } from "@/env.server"
import * as React from "react";
import {SidebarContextProps} from "../../types/sidebar.context.props";
import {useIsMobile} from "@/utils/use-mobile";

export const globalAppContext = createContext<LoadContext>()

const SIDEBAR_KEYBOARD_SHORTCUT = "b"

export const getAppContext = async (c: Context) => {
	// get the locale from the context
	const locale = i18next.getLocale(c)
	// get t function for the default namespace
	const t = await i18next.getFixedT(c)
	// get the server environment
	const env = getServerEnv()

	const isMobile = useIsMobile()
	const [openMobile, setOpenMobile] = React.useState(false)

	// This is the internal state of the sidebar.
	// We use openProp and setOpenProp for control from outside the component.
	const [open, setOpen] = React.useState<boolean>(false)
	// Helper to toggle the sidebar.
	const toggleSidebar = React.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
	}, [isMobile, setOpen, setOpenMobile])

	// Adds a keyboard shortcut to toggle the sidebar.
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault()
				toggleSidebar()
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [toggleSidebar])

	// We add a state so that we can do data-state="expanded" or "collapsed".
	// This makes it easier to style the sidebar with Tailwind classes.
	const state = open ? "expanded" : "collapsed"

	const contextValue = React.useMemo<SidebarContextProps>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
		}),
		[state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
	)

	return {
		lang: locale,
		sidebarContext: contextValue,
		t,
		isProductionDeployment: env.APP_ENV === "production",
		env,
		clientEnv: getClientEnv(),
		// We do not add this to AppLoadContext type because it's not needed in the loaders, but it's used above to handle requests
		body: c.body,
	}
}

export const getLoadContext = async (c: Context) => {
	const ctx = new RouterContextProvider()
	const globalCtx = await getAppContext(c)
	ctx.set(globalAppContext, globalCtx)
	return ctx
}

interface LoadContext extends Awaited<ReturnType<typeof getAppContext>> {}

/**
 * Declare our loaders and actions context type
 */
declare module "react-router" {
	interface AppLoadContext extends Omit<LoadContext, "body"> {}
}
