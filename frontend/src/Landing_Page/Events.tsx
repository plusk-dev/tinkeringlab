import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}

export default function Events(){
  return <>
    <div className="w-full flex flex-col md:flex-row my-10">
      <Card className=" hidden md:w-1/3 md:block ">
        <CardTitle className=" md:flex md:justify-center md:items-center md:h-full">Events</CardTitle>
      </Card>
      <Card className="md:hidden info-card  py-2">
        <CardTitle className="text-center">Events</CardTitle>
      </Card>
        <Carousel plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction:false
            }),
          ]} className="w-full">
          <CarouselContent >
            <CarouselItem>
              <Card className=" h-[300px] info-card">
                <CardContent>1</CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className=" h-[300px] info-card">
                <CardContent>2</CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
  </>
}