import type { MetaFunction } from "react-router";
import HeroCarousel from "@/components/home/hero-carousel";
import HorizontalScrollSection from "@/components/home/horizontal-scroll-section";
import PopularGridSection from "@/components/home/popular-grid-section";

export const meta: MetaFunction = () => {
  return [
    { title: "Outlet iCommerce" },
    { name: "Outlet's home page", content: "Welcome to Outlet's home!" },
  ];
};

export default function Index() {
  return (
      <main className='mx-auto size-full max-w-7xl flex-1 px-2 py-0 sm:px-4'>
        <section className="grid grid-cols gap-10 row-start-2 col-start-1">
          <HeroCarousel />
          <HorizontalScrollSection />
          <PopularGridSection />
        </section>
      </main>
  );
}
