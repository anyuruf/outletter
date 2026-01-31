import {
    Carousel,
    CarouselContent,
    CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { slides } from "@/constants/carouselProducts"
import { GradientText } from '@/components/shadcn-io/GradientText';
import CarouselButtonGroup from "@/components/shadcn-io/ButtonGroup";
import useEmblaCarousel from "embla-carousel-react";

export default function HeroCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.plugins().autoplay?.play()
    }, [emblaApi])



  return (
    <section className="max-w-7xl mx-auto w-full">
      <Carousel
        ref={emblaRef}
        opts={{ loop: true, align: "center" }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem
              key={slide.id}
            >
                {/********* Image Overlay *************/}
              <div
                className="relative w-full h-[480px] overflow-hidden bg-muted bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.imgUrl})`,
                }}>
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center text-chart-2 justify-center p-8 text-center">
                  <GradientText className="mb-2 font-extrabold text-shadow-md  text-8xl" text={slide.title}/>
                  <p className="mb-6 max-w-md text-sm text-white opacity-90">
                    {slide.description}
                  </p>
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
  );
}
