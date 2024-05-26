import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getUrl } from "@/utils";

interface eventType {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  event_date: Date;
  img_name: string;
  on_landing_page: boolean;
}

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
  );
}

export default function Events() {
  const [events, setEvents] = useState<eventType[]>([]);

  useEffect(() => {
    getUrl("/landing/all", {}).then((response) => {
      setEvents(JSON.parse(response.data));
      console.log(JSON.parse(response.data));
    });
  }, []);
  return (
    <>
      <div
        className={`${
          events.filter((item) => {
            return item.on_landing_page === true;
          }) && events.length === 0
            ? "hidden"
            : ""
        } w-full flex flex-col md:flex-row mt-10 mb-5`}
      >
        <Card className=" hidden md:w-1/3 md:block ">
          <CardTitle className=" md:flex md:justify-center md:items-center md:h-full">
            Events
          </CardTitle>
        </Card>
        <Card className="md:hidden info-card  py-2">
          <CardTitle className="text-center">Events</CardTitle>
        </Card>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {events.map((item) => {
              if (item.on_landing_page) {
                console.log(item);
                return (
                  <CarouselItem>
                    <Card className="lg:h-[300px] h-[600px] info-card">
                      <CardContent className="h-full p-0 flex flex-col lg:flex-row">
                        <Card>
                          <img
                            src={`http://127.0.0.1:5000/static/${item.img_name}`}
                            className="h-[298px] w-[400px] rounded-sm"
                          ></img>
                        </Card>
                        <div className="flex-1">
                          <h2 className="flex-1 lg:flex-[2] p-4 text-2xl font-bold">
                            {item.title}
                          </h2>
                          <p className="px-4 pb-4">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              }
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
