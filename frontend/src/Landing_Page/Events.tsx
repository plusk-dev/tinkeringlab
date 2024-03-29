import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

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

      <div className="w-full flex flex-col md:flex-row mt-10">

      <Card className="lg:hidden info-card  py-2">
        <CardTitle className="text-center">Projects</CardTitle>
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
        <Card className=" hidden lg:w-1/3 md:block ">
        <CardTitle className=" md:flex md:justify-center md:items-center md:h-full">Projects</CardTitle>
      </Card>
      </div>
        
        <div className="flex w-full justify-center mt-2 mb-10">
          <a href="/allE&P" className=" text-cyan-500 text-xl hover:underline">
            Explore all
          </a>
        </div>

  </>
}