import { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import ExpandableSearch from "@/components/headers/expandable.search"
import { InfoMenu } from "@/components/headers/info.menu"
import { NotificationMenu } from "@/components/headers/notification-menu"
import OutletLogoSVG from "@/components/headers/outlet.logo.svg"
import SearchForm from "@/components/headers/search.form"
import { UserMenu } from "@/components/headers/user.menu"
import DesktopNav from "@/components/shadcn-studio/blocks/desktop-nav"
import MobilePopNav from "@/components/shadcn-studio/blocks/mobile-pop-nav"
import ThemeSwitch from "@/components/theme/switch-toggle"
import { Button } from "@/components/ui/button"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import type { NavbarProps } from "@/types.d.ts/navigation"
import { defaultNavigationLinks } from "@/utils/constants"
import { cn } from "@/utils/misc"
import { useRouteData } from "@/utils/use-parent-data"

export const AppHeader = forwardRef<HTMLElement, NavbarProps>(
	(
		{
			className,
			logo = <OutletLogoSVG />,
			logoHref = "/",
			navigationLinks = defaultNavigationLinks,
			userName = "anyuruf",
			userEmail = "anyuruf@example.com",
			userAvatar,
			notificationCount = 8,
			onNavItemClick,
			onInfoItemClick,
			onNotificationItemClick,
			onUserItemClick,
			...props
		},
		ref
	) => {
		const [isMobile, setIsMobile] = useState(false)
		const containerRef = useRef<HTMLElement | null>(null)
		// Don't show mobile nav when side open
		const { open, setOpen } = useSidebar()
		// useAccount from Authentication
		const { userAccount } = useRouteData()

		useEffect(() => {
			const checkWidth = () => {
				if (containerRef.current) {
					const width = containerRef.current.offsetWidth
					setIsMobile(width < 1224 && !open) // 768px is md breakpoint
				}
			}

			checkWidth()

			const resizeObserver = new ResizeObserver(checkWidth)
			if (containerRef.current) {
				resizeObserver.observe(containerRef.current)
			}

			return () => {
				resizeObserver.disconnect()
			}
		}, [open])

		// Combine refs
		const combinedRef = useCallback(
			(node: HTMLElement | null) => {
				if (!node) return
				containerRef.current = node
				if (typeof ref === "function") {
					ref(node)
				} else if (ref) {
					ref.current = node
				}
			},
			[ref]
		)

		return (
			<header
				ref={combinedRef}
				className={cn(
					"sticky top-0 z-35 w-full max-w-9xl border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 [&_*]:no-underline",
					className
				)}
				{...props}
			>
				{/* Mobile Menu */}
				{isMobile && (
					<div className="inline-flex w-full max-w-8xl items-center justify-between gap-4 px-2 py-2 sm:px-4">
						{/****Left Side - Mobile Logo ****/}
						<button
							onClick={(e) => e.preventDefault()}
							className="flex cursor-pointer items-center px-2 text-primary transition-colors hover:text-primary/90"
						>
							{logo}
						</button>

						{/****Right Side - Mobile Menu Search ****/}
						<div className="inline-flex items-center gap-1 md:gap-2">
							<ExpandableSearch />
							<MobilePopNav navigationLinks={navigationLinks} />
						</div>
					</div>
				)}

				{/* Desktop Menu */}
				{!isMobile && (
					<div className="my-4 inline-flex w-full max-w-9xl items-center justify-between gap-2 px-2 sm:px-4">
						{/****Left Side - Desktop Logo ****/}
						<div className="inline-flex items-center justify-between gap-3">
							{!open && (
								<button
									onClick={(e) => e.preventDefault()}
									className="flex cursor-pointer items-center px-2 text-primary transition-colors hover:text-primary/90"
								>
									{logo}
								</button>
							)}
							<SidebarTrigger className="[&_svg]:!size-4" />

							{/* Navigation menu */}
							<DesktopNav navigationLinks={navigationLinks} />
						</div>

						{/****In the Middle - Search form ****/}
						<div className="flex w-full items-center justify-center py-2">
							<SearchForm />
						</div>

						{/* Right side */}
						<div className="inline-flex items-center gap-1">
							{/* ThemeSwitch */}

							<ThemeSwitch />

							{/* Info menu */}
							<InfoMenu onItemClick={onInfoItemClick} />

							{/* Notification */}
							{userAccount ? (
								<>
									<NotificationMenu notificationCount={notificationCount} onItemClick={onNotificationItemClick} />
									<UserMenu
										userName={userAccount.firstName}
										userEmail={userAccount.email}
										userAvatar={userAccount.imgUrl}
									/>
								</>
							) : (
								<Button variant="outline" asChild>
									<Link to="/login">Log in</Link>
								</Button>
							)}
						</div>
					</div>
				)}
			</header>
		)
	}
)

AppHeader.displayName = "AppHeader"
