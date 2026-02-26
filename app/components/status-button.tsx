import type { ComponentProps } from "react"
import { useSpinDelay } from "spin-delay"
import { Icon } from "@/components/icon"
import { Button, type ButtonVariant } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/utils/misc"

export const StatusButton = ({
	message,
	status,
	className,
	children,
	spinDelay,
	...props
}: ComponentProps<"button"> &
	ButtonVariant & {
		status: "pending" | "success" | "error" | "idle"
		message?: string | null
		spinDelay?: Parameters<typeof useSpinDelay>[1]
	}) => {
	const delayedPending = useSpinDelay(status === "pending", {
		delay: 400,
		minDuration: 300,
		...spinDelay,
	})
	const companion = {
		pending: delayedPending ? (
			<div role="status" className="inline-flex size-6 items-center justify-center">
				<Icon name="update" className="animate-spin" title="loading" />
			</div>
		) : null,
		success: (
			<div role="status" className="inline-flex size-6 items-center justify-center">
				<Icon name="check" title="success" />
			</div>
		),
		error: (
			<div role="status" className="inline-flex size-6 items-center justify-center rounded-full bg-destructive">
				<Icon name="cross-1" className="text-destructive-foreground" title="error" />
			</div>
		),
		idle: null,
	}[status]

	return (
		<Button className={cn("flex justify-center gap-4", className)} {...props}>
			<div>{children}</div>
			{message ? (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>{companion}</TooltipTrigger>
						<TooltipContent>{message}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : (
				companion
			)}
		</Button>
	)
}
StatusButton.displayName = "Button"
