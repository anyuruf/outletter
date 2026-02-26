import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useRef, useState } from "react"
import CarouselButtonGroup from "@/components/shadcn-io/ButtonGroup"
import { GradientText } from "@/components/shadcn-io/GradientText"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { slides } from "@/constants/carouselProducts"

export default function HeroCarousel() {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

	useEffect(() => {
		if (!emblaApi) return
		emblaApi.plugins().autoplay?.play()
	}, [emblaApi])

	return (
		<section className="mx-auto w-full max-w-7xl">
			<Carousel ref={emblaRef} opts={{ loop: true, align: "center" }}>
				<CarouselContent>
					{slides.map((slide, index) => (
						<CarouselItem key={slide.id}>
							{/********* Image Overlay *************/}
							<div
								className="relative h-[480px] w-full overflow-hidden bg-center bg-cover bg-muted bg-no-repeat"
								style={{
									backgroundImage: `url(${slide.imgUrl})`,
								}}
							>
								{/* gradient overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
								<div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-chart-2">
									<GradientText className="mb-2 font-extrabold text-8xl text-shadow-md" text={slide.title} />
									<p className="mb-6 max-w-md text-sm text-white opacity-90">{slide.description}</p>
									<Button variant="secondary">{slide.cta}</Button>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	)
}
