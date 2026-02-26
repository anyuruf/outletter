import type * as React from "react"
import OutletLogoSvg from "@/components/headers/outlet.logo.svg"
import { Sidebar, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"

export const AppSidebar = ({ className, children, ...props }: React.ComponentProps<"div">) => {
	return (
		<div className="flex min-h-dvh w-full">
			<SidebarProvider defaultOpen={false}>
				<Sidebar className={className}>
					<SidebarHeader className="gap-0 p-0">
						{/********* Overlay for Logo to have same background as the one in the AppHeader ******/}
						<div className="item-center justify-left z-53 flex border-b bg-background/95 px-12 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
							<OutletLogoSvg className="h-8" />
						</div>
					</SidebarHeader>
				</Sidebar>
				<div className="flex flex-1 flex-col">{children}</div>
			</SidebarProvider>
		</div>
	)
}
