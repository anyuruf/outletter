// Notification Menu Component

import { BellIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const NotificationMenu = ({
	notificationCount = 3,
	onItemClick,
}: {
	notificationCount?: number
	onItemClick?: (item: string) => void
}) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" size="icon" className="relative h-9 w-9">
				<BellIcon className="h-4 w-4" />
				{notificationCount > 0 && (
					<Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
						{notificationCount > 9 ? "9+" : notificationCount}
					</Badge>
				)}
				<span className="sr-only">Notifications</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" className="w-80">
			<DropdownMenuLabel>Notifications</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem onClick={() => onItemClick?.("notification1")}>
				<div className="flex flex-col gap-1">
					<p className="font-medium text-sm">New message received</p>
					<p className="text-muted-foreground text-xs">2 minutes ago</p>
				</div>
			</DropdownMenuItem>
			<DropdownMenuItem onClick={() => onItemClick?.("notification2")}>
				<div className="flex flex-col gap-1">
					<p className="font-medium text-sm">System update available</p>
					<p className="text-muted-foreground text-xs">1 hour ago</p>
				</div>
			</DropdownMenuItem>
			<DropdownMenuItem onClick={() => onItemClick?.("notification3")}>
				<div className="flex flex-col gap-1">
					<p className="font-medium text-sm">Weekly report ready</p>
					<p className="text-muted-foreground text-xs">3 hours ago</p>
				</div>
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem onClick={() => onItemClick?.("view-all")}>View all notifications</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
)
