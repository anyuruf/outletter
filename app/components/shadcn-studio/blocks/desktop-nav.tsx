import * as React from "react"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"

interface NavbarItem {
	href?: string
	label: string
}

interface DesktopNavProps {
	navigationLinks?: NavbarItem[]
}

function DesktopNav({ navigationLinks }: DesktopNavProps) {
	return (
		<>
			<NavigationMenu className="flex">
				<NavigationMenuList className="gap-1">
					{navigationLinks?.map((link, index) => (
						<NavigationMenuItem key={index}>
							<NavigationMenuLink
								href={link?.href}
								onClick={(e) => {
									e.preventDefault()
									if (onNavItemClick && link?.href) onNavItemClick(link?.href)
								}}
								className="group inline-flex h-10 w-max cursor-pointer items-center justify-center rounded-md bg-background px-4 py-1.5 py-2 font-semibold text-md text-muted-foreground text-sm transition-colors hover:text-primary focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
							>
								{link.label}
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</>
	)
}

export default DesktopNav
