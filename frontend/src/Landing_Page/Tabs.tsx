import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function About() {
  return (
    <Tabs defaultValue="account" className="w-full md:px-32" >
      
      <TabsList className="grid grid-cols-3 text-[#003f87] info-card ">
        <TabsTrigger className="font-semibold" value="account">About Us</TabsTrigger>
        <TabsTrigger className="font-semibold" value="wsua">Why are we different?</TabsTrigger>
        <TabsTrigger className="font-semibold" value="jttm">Join us</TabsTrigger>
      </TabsList>
      

      <TabsContent value="account">
        <Card className="info-card">
          <CardHeader>
            <CardTitle className="text-[#003f87] text-center">Welcome to Tinkerers' Lab</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm font-medium text-center">
              Our mission is to provide a collaborative space for passionate minds to explore,
              experiment, and bring their ideas to life.
              At Tinkerers Lab, we are driven by a relentless passion for innovation. Whether you're a seasoned inventor or a curious beginner, 
              our lab is designed to inspire and facilitate 
              the birth of groundbreaking ideas.
            </p>
          </CardContent>
          
        </Card>
      </TabsContent>
      <TabsContent value="wsua">
        <Card className="info-card">
            <CardHeader>
              <CardTitle className="text-[#003f87] text-center">State of the art facilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-medium text-center">
              Equipped with cutting-edge tools, advanced machinery, and a well-stocked 
              inventory of materials, Tinkerers Lab provides the ideal environment 
              for turning concepts into reality. Explore the possibilities with 
              our top-notch facilities.
              </p>
            </CardContent>
          </Card>
      </TabsContent>

      <TabsContent value="jttm">
        <Card className="info-card">
            <CardHeader>
              <CardTitle className="text-[#003f87] text-center">Join the Tinkerers' movement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-medium text-center">
                Become a part of the Tinkerers Movement and unleash your imagination.
                Whether you're tinkering for fun or aiming to change the world,
                Tinkerers Lab is where ideas take flight.
              </p>
            </CardContent>
          </Card>
      </TabsContent>
    </Tabs>
  )
}
