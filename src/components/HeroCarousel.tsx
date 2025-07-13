import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';

const carouselImages = [hero1, hero2, hero3, hero4];

function HeroCarousel() {
  return (
    <div>
      <Carousel opts={{ align: 'start', loop: true }} className="relative">
        <CarouselContent className="touch-pan-x overflow-visible">
          {carouselImages.map((image, index) => (
            <CarouselItem
              key={index}
              className="min-w-[80vw] sm:min-w-[60vw] md:min-w-[40vw] lg:min-w-full"
            >
              <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
                <CardContent className="p-0">
                  <img
                    src={image}
                    alt={`hero-${index + 1}`}
                    className="
        w-full
        h-[20rem] sm:h-[24rem] md:h-[28rem]
        object-cover object-center
        transition-transform duration-300 ease-in-out
        hover:scale-105
      "
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="
            absolute z-20 top-1/2 left-4 -translate-y-1/2
            rounded-full border border-gray-300 bg-white bg-opacity-60 backdrop-blur-sm
            text-gray-700
            p-2
            shadow-md hover:shadow-lg
            transition-transform duration-200 hover:scale-110 hover:bg-opacity-90
            disabled:opacity-40 disabled:pointer-events-none
            cursor-pointer
          "
          aria-label="Previous Slide"
        />
        <CarouselNext
          className="
            absolute z-20 top-1/2 right-4 -translate-y-1/2
            rounded-full border border-gray-300 bg-white bg-opacity-60 backdrop-blur-sm
            text-gray-700
            p-2
            shadow-md hover:shadow-lg
            transition-transform duration-200 hover:scale-110 hover:bg-opacity-90
            disabled:opacity-40 disabled:pointer-events-none
            cursor-pointer
          "
          aria-label="Next Slide"
        />
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
