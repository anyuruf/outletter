import { Outlet } from "react-router"
import { AppSidebar } from "@/components/app.sidebar"
import { AppHeader } from "@/components/headers/app.header"

export default function Layout() {
	return (
		<AppSidebar>
			<AppHeader />
			<Outlet />
		</AppSidebar>
	)
}
