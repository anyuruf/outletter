// Outlet's _layout Landing page

import PopularGridSection from "@/components/home/popular-grid-section";
import HorizontalScrollSection from "@/components/home/horizontal-scroll-section";
import HeroCarousel from "@/components/home/hero-carousel";

export default function ProductIndex () {
    return (
        <main className='mx-auto size-full max-w-7xl flex-1 px-2 py-0 sm:px-4'>
            {/* Main content */}
            <section className="grid grid-cols gap-10 row-start-2 col-start-1">
                <HeroCarousel />
                <HorizontalScrollSection />
                <PopularGridSection />
            </section>
        </main>
    );
}