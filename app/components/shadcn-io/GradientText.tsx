import { motion, type Transition } from "motion/react"
import type * as React from "react"
import { cn } from "@/utils/misc"

type GradientTextProps = React.ComponentProps<"span"> & {
	text: string
	gradient?: string
	neon?: boolean
	transition?: Transition
}

function GradientText({
	text,
	className,
	gradient = "linear-gradient(45deg, #84170ffb, #f59e0b, #b45309, #78350f, #721109)",
	neon = false,
	transition = { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
	...props
}: GradientTextProps) {
	const baseStyle: React.CSSProperties = {
		backgroundImage: gradient,
	}

	return (
		<span data-slot="gradient-text" className={cn("relative inline-block", className)} {...(props as any)}>
			<motion.span
				className="m-0 bg-[length:200%_100%] bg-clip-text text-transparent"
				style={baseStyle}
				animate={{ backgroundPositionX: ["0%", "200%"] }}
				transition={transition}
			>
				{text}
			</motion.span>

			{neon && (
				<motion.span
					className="absolute top-0 left-0 m-0 bg-[length:200%_100%] bg-clip-text text-transparent mix-blend-plus-lighter blur-[8px]"
					style={baseStyle}
					animate={{ backgroundPositionX: ["0%", "200%"] }}
					transition={transition}
				>
					{text}
				</motion.span>
			)}
		</span>
	)
}

export { GradientText, type GradientTextProps }
