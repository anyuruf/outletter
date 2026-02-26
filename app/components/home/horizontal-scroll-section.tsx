import SectionHeading from "@/components/home/product-card/section-heading"
import SlimProductCard from "@/components/home/product-card/slim-product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { featuredProducts } from "@/constants/featuredProducts"

export default function HorizontalScrollSection() {
	return (
		<section className="grid-cols mx-auto grid max-w-7xl gap-2 md:gap-4">
			<SectionHeading text="Featured Products" />
			<div className="flex w-full justify-center">
				<Carousel
					opts={{
						align: "start",
					}}
					className="grid w-full max-w-7xl"
				>
					<CarouselContent>
						{featuredProducts.map((prod, index) => (
							<CarouselItem key={prod.id} className="basis-1/2 md:basis-1/6 lg:basis-1/8">
								<SlimProductCard key={prod.id} title={prod.title} imgUrl={prod.imgUrl} description={prod.description} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="left-4" />
					<CarouselNext className="right-4" />
				</Carousel>
			</div>
		</section>
	)
}
