// Outlet's _layout Landing page

import HeroCarousel from "@/components/home/hero-carousel"
import HorizontalScrollSection from "@/components/home/horizontal-scroll-section"
import PopularGridSection from "@/components/home/popular-grid-section"

export default function ProductIndex() {
	return (
		<main className="mx-auto size-full max-w-7xl flex-1 px-2 py-0 sm:px-4">
			{/* Main content */}
			<section className="grid-cols col-start-1 row-start-2 grid gap-10">
				<HeroCarousel />
				<HorizontalScrollSection />
				<PopularGridSection />
			</section>
		</main>
	)
}
