import { Image } from "@unpic/react"
import { ArrowRight, PhoneForwarded } from "lucide-react"
import { useEffect, useRef } from "react"
import { BounceButton } from "@/components/shadcn-studio/BounceButton/BounceButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { additionalDescription } from "@/constants/carouselProducts"

interface CardTransform {
	rotateX: number
	rotateY: number
	scale: number
}

const ProductCard = ({ title, imgUrl, description }) => {
	const cardRef = useRef<HTMLDivElement | null>(null)
	const imageRef = useRef<HTMLImageElement | null>(null)
	const animationFrameRef = useRef<number | undefined>(undefined)
	const lastMousePosition = useRef({ x: 0, y: 0 })

	useEffect(() => {
		const card = cardRef.current
		const image = imageRef.current

		if (!card || !image) return

		let rect: DOMRect
		let centerX: number
		let centerY: number

		const updateCardTransform = (mouseX: number, mouseY: number) => {
			if (!rect) {
				rect = card.getBoundingClientRect()
				centerX = rect.left + rect.width / 2
				centerY = rect.top + rect.height / 2
			}

			const relativeX = mouseX - centerX
			const relativeY = mouseY - centerY

			const cardTransform: CardTransform = {
				rotateX: -relativeY * 0.035,
				rotateY: relativeX * 0.035,
				scale: 1.025,
			}

			const imageTransform: CardTransform = {
				rotateX: -relativeY * 0.025,
				rotateY: relativeX * 0.025,
				scale: 1.05,
			}

			return { cardTransform, imageTransform }
		}

		const animate = () => {
			const { cardTransform, imageTransform } = updateCardTransform(
				lastMousePosition.current.x,
				lastMousePosition.current.y
			)

			card.style.transform = `perspective(1000px) rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg) scale3d(${cardTransform.scale}, ${cardTransform.scale}, ${cardTransform.scale})`
			card.style.boxShadow = "0 10px 35px rgba(0, 0, 0, 0.2)"

			image.style.transform = `perspective(1000px) rotateX(${imageTransform.rotateX}deg) rotateY(${imageTransform.rotateY}deg) scale3d(${imageTransform.scale}, ${imageTransform.scale}, ${imageTransform.scale})`

			animationFrameRef.current = requestAnimationFrame(animate)
		}

		const handleMouseMove = (e: MouseEvent) => {
			lastMousePosition.current = { x: e.clientX, y: e.clientY }
		}

		const handleMouseEnter = () => {
			card.style.transition = "transform 0.2s ease, box-shadow 0.2s ease"
			image.style.transition = "transform 0.2s ease"
			animate()
		}

		const handleMouseLeave = () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}

			card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
			card.style.boxShadow = "none"
			card.style.transition = "transform 0.5s ease, box-shadow 0.5s ease"

			image.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
			image.style.transition = "transform 0.5s ease"
		}

		card.addEventListener("mouseenter", handleMouseEnter)
		card.addEventListener("mousemove", handleMouseMove)
		card.addEventListener("mouseleave", handleMouseLeave)

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}

			card.removeEventListener("mouseenter", handleMouseEnter)
			card.removeEventListener("mousemove", handleMouseMove)
			card.removeEventListener("mouseleave", handleMouseLeave)
		}
	}, [])

	return (
		<Card ref={cardRef} className="max-w-sm border-0">
			<CardHeader className="flex flex-row justify-between">
				<CardTitle className="font-extrabold text-md text-shadow">{title}</CardTitle>
				<Badge className="rounded-full font-extrabold text-gray-600 text-sm">
					<span>UGX</span> 38,000
				</Badge>
			</CardHeader>
			<CardContent className="mask-radial-from-[55%_92%] p-0 pb-2 md:pb-4">
				<Image ref={imageRef} src={imgUrl} alt={title} className="block aspect-video h-48 w-full object-cover" />
			</CardContent>
			<CardFooter>
				<div className="grid w-full space-y-2">
					<CardDescription className="mb-6 line-clamp-2">
						{description} {additionalDescription}
					</CardDescription>
					<BounceButton className="inline-flex gap-2 px-2 font-extrabold text-md text-shadow">
						Detailed View <ArrowRight strokeWidth={3} className="h-4 w-4 font-extrabold text-md" />
					</BounceButton>
					<BounceButton variant={"outline"} className="inline-flex gap-2 px-2 font-extrabold text-md text-shadow">
						Show Phone <PhoneForwarded strokeWidth={3} className="h-4 w-4" />
					</BounceButton>
				</div>
			</CardFooter>
		</Card>
	)
}

export default ProductCard
