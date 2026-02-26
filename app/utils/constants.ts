import type { NavbarNavItem } from "@/types.d.ts/navigation.ts"

//export const BACKEND_SERVER_URL = String(process.env.BACKEND_SERVER_URL) || "http://localhost:8080";
export const BACKEND_SERVER_URL = "http://localhost:8080"

// Default navigation links
export const defaultNavigationLinks: NavbarNavItem[] = [
	{ href: "#", label: "Home" },
	{ href: "#", label: "Great Deals" },
	{ href: "#", label: "Sell" },
	{ href: "#", label: "My Outlet" },
]
