import { useMatches, useRouteLoaderData } from "react-router"

export function useParentData(pathname: string): unknown {
	const matches = useMatches()
	const parentMatch = matches.find((match) => match.pathname === pathname)
	if (!parentMatch) return null
	return parentMatch.loaderData
}

export function useRouteData() {
	const match = useRouteLoaderData("root")
	if (!match) {
		throw new Error("this root data does not exist on the current route")
	}
	return match
}
