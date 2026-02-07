import { useTranslation } from "react-i18next"
import {LinksFunction, MiddlewareFunction, useLoaderData} from "react-router"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "react-router"
import type { Route } from "./+types/root"
import { LanguageSwitcher } from "./library/language-switcher"
import { globalAppContext } from "./server/context"
import { ClientHintCheck, getHints } from "./services/client-hints"
import  "./globals.css"
import {ReactNode} from "react";
import {PreventFlashOnWrongTheme, type Theme, ThemeProvider, useTheme} from "remix-themes"
import {clsx} from "clsx";
import {themeSessionResolver} from "@/utils/sessions.server";
import {AppSidebar} from "@/components/app.sidebar";
import {AppHeader} from "@/components/headers/app.header";
import {getOptionalUserAccount, globalStorageMiddleware} from "@/middleware/context-storage";


export async function loader({ context, request }: Route.LoaderArgs) {

	// Return the theme from the session storage using the loader
	const { getTheme } = await themeSessionResolver(request)
	const userAccount = getOptionalUserAccount()
	const { lang } = context.get(globalAppContext)
	const hints = getHints(request)
	return { lang,  hints, theme: getTheme(), userAccount }
}


export const handle = {
	i18n: "common",
}

export default async function AppWithProviders() {
	const data = useLoaderData<typeof loader>()

	return (
		<ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
			<AppLayout />
		</ThemeProvider>
	)
}

async function AppLayout () {
	return(
		<Document>
			<AppSidebar>
				<AppHeader />
				<Outlet />
			</AppSidebar>
		</Document>
	)
}

const Document = ({ children,  }: { children: ReactNode;  }) => {
	const { i18n } = useTranslation()
	const data = useLoaderData<typeof loader>()
	const [theme] = useTheme();

	return (
		<html className={clsx(theme)} lang={i18n.language} dir={i18n.dir()}>
			<head>
				<ClientHintCheck />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
				<Meta />
				<Links />
			</head>
			<body className="h-full w-full">
				<LanguageSwitcher />
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}


export const ErrorBoundary = () => {
	const error = useRouteError()
	const { t } = useTranslation()
	// Constrain the generic type so we don't provide a non-existent key
	const statusCode = () => {
		if (!isRouteErrorResponse(error)) {
			return "500"
		}
		// Supported error code messages
		switch (error.status) {
			case 200:
				return "200"
			case 403:
				return "403"
			case 404:
				return "404"
			default:
				return "500"
		}
	}
	const errorStatusCode = statusCode()

	return (
		<div className="relative flex h-full min-h-screen w-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 placeholder-index sm:pt-8 sm:pb-16 ">
			<div className="relative mx-auto max-w-[90rem] sm:px-6 lg:px-8">
				<div className="relative flex min-h-72 flex-col justify-center p-1 sm:overflow-hidden sm:rounded-2xl md:p-4 lg:p-6">
					<h1 className="w-full pb-2 text-center text-2xl text-red-600">{t(`error.${errorStatusCode}.title`)}</h1>
					<p className="w-full text-center text-lg dark:text-white">{t(`error.${errorStatusCode}.description`)}</p>
				</div>
			</div>
		</div>
	)
}

export const middleware: MiddlewareFunction<Response>[] = [
	globalStorageMiddleware,
]