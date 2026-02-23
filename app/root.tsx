import {type LoaderFunctionArgs, type MiddlewareFunction,  useRouteLoaderData} from "react-router"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import {  getHints } from "./services/client-hints"
import  "./globals.css"
import {PreventFlashOnWrongTheme, Theme, ThemeProvider, useTheme} from "remix-themes"
import {clsx} from "clsx";
import {themeSessionResolver} from "@/utils/sessions.server";
import {getOptionalUserAccount, globalStorageMiddleware} from "@/middleware/context-storage";
import { TooltipProvider } from "@/components/ui/tooltip"
import type {ReactNode} from "react";
import {Route} from "../.react-router/types/app/routes/+types";


export async function loader({ request }: LoaderFunctionArgs) {

	// Return the theme from the session storage using the loader
	const { getTheme } = await themeSessionResolver(request)
	const userAccount = getOptionalUserAccount()
	const hints = getHints(request)
	return {  hints, theme: getTheme(), userAccount }
}


export function Layout({ children }: { children: ReactNode }) {
	const data = useRouteLoaderData<typeof loader>('root');

	return (
		<ThemeProvider
			specifiedTheme={data?.theme as Theme}
			themeAction="/actions/set-theme"
		>
			<InnerLayout ssrTheme={Boolean(data?.theme)}>{children}</InnerLayout>
		</ThemeProvider>
	);
}

export default function App() {
	return <Outlet />;
}


export function InnerLayout({ ssrTheme, children }: { ssrTheme: boolean; children: ReactNode }) {
	const [theme] = useTheme();

	return (
		<html lang="en" className={clsx(theme)}>
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<Meta />
			<PreventFlashOnWrongTheme ssrTheme={ssrTheme} />
			<Links />
		</head>
		<body>
		<TooltipProvider>{children}</TooltipProvider>
		<ScrollRestoration />
		<Scripts />
		</body>
		</html>
	);
}


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}



export const middleware: MiddlewareFunction<Response>[] = [
	globalStorageMiddleware,
]