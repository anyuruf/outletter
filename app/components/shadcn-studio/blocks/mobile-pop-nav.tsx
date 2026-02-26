import HamburgerIconSvg from "@/components/headers/hamburger-icon-svg"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface NavbarItem {
	href?: string
	label: string
}

interface MobilePopNavProps {
	navigationLinks?: NavbarItem[]
}

function MobilePopNav({ navigationLinks }: MobilePopNavProps) {
	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Button className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground" variant="ghost" size="icon">
						<HamburgerIconSvg />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className="w-64 p-1">
					<NavigationMenu className="max-w-none">
						<NavigationMenuList className="flex-col items-start gap-1">
							{navigationLinks?.map((link, index) => (
								<NavigationMenuItem key={index} className="w-full">
									<button
										onClick={(e) => {
											e.preventDefault()
											if (onNavItemClick && link.href) onNavItemClick(link.href)
										}}
										className="flex w-full cursor-pointer items-center rounded-md px-3 py-2 font-medium text-sm no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
									>
										{link.label}
									</button>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</PopoverContent>
			</Popover>
		</>
	)
}

export default MobilePopNav
