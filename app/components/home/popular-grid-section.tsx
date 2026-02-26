import ProductCard from "@/components/home/product-card/product-card"
import SectionHeading from "@/components/home/product-card/section-heading"
import { slides } from "@/constants/carouselProducts"
import { featuredProducts } from "@/constants/featuredProducts"

export default function PopularGridSection() {
	const products = featuredProducts.concat(slides)
	return (
		<section className="grid-cols gap2 mx-auto grid w-full max-w-7xl md:gap-4">
			<SectionHeading text="Popular _layout" />
			<div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] justify-center gap-3">
				{products.map((prod) => (
					<ProductCard key={prod.id} title={prod.title} imgUrl={prod.imgUrl} description={prod.description} />
				))}
			</div>
		</section>
	)
}
