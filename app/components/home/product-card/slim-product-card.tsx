import { Image } from "@unpic/react"
import { ArrowRight, PhoneForwarded } from "lucide-react"
import { useEffect, useRef } from "react"
import { BounceButton } from "@/components/shadcn-studio/BounceButton/BounceButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const SlimProductCard = ({ title, imgUrl, description }) => {
	return (
		<Card className="grid max-w-sm grid-cols-subgrid border-0">
			<CardHeader className="flex space-y-2 px-3">
				<CardTitle className="line-clamp-1 font-extrabold text-shadow text-xs">{title}</CardTitle>
				<Badge className="rounded-full font-extrabold text-gray-600 text-xs">
					<span>UGX</span> 38,000
				</Badge>
			</CardHeader>
			<CardContent className="mask-radial-from-[55%_92%] p-0">
				<Image src={imgUrl} alt={title} className="block aspect-video h-35 w-full object-cover" />
			</CardContent>
			<CardFooter className="px-3">
				<div className="line-clamp-1 grid gap-2 text-wrap px-0">
					<CardDescription className="line-clamp-2">{description}</CardDescription>
					<BounceButton className="inline-flex gap-2 px-2 font-extrabold text-md text-shadow">
						Details
						<ArrowRight strokeWidth={3} className="h-2 w-2 font-bold" />
					</BounceButton>
					<BounceButton variant={"outline"} className="inline-flex gap-2 px-2 font-extrabold text-md text-shadow">
						Show
						<PhoneForwarded strokeWidth={3} className="h-2 w-2" />
					</BounceButton>
				</div>
			</CardFooter>
		</Card>
	)
}

export default SlimProductCard
