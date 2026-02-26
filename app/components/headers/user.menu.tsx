// User Menu Component

import { ChevronDownIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const UserMenu = ({
	userName = "John Doe",
	userEmail = "john@example.com",
	userAvatar,
	onItemClick,
}: {
	userName?: string
	userEmail?: string
	userAvatar?: string
	onItemClick?: (item: string) => void
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-9 px-2 py-0 hover:bg-accent hover:text-accent-foreground">
					<Avatar className="h-7 w-7">
						<AvatarImage src={userAvatar} alt={userName} />
						<AvatarFallback className="text-xs">
							{userName
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>
					<ChevronDownIcon className="ml-1 h-3 w-3" />
					<span className="sr-only">User menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="font-medium text-sm leading-none">{userName}</p>
						<p className="text-muted-foreground text-xs leading-none">{userEmail}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => onItemClick?.("profile")}>Profile</DropdownMenuItem>
				<DropdownMenuItem onClick={() => onItemClick?.("settings")}>Settings</DropdownMenuItem>
				<DropdownMenuItem onClick={() => onItemClick?.("billing")}>Billing</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => onItemClick?.("logout")}>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
