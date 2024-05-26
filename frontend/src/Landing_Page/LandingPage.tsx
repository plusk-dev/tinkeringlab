import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "./Navbar";
import { useEffect } from "react";
import { useState } from "react";
import "./LandingPage.css";
import Events from "./Events";
import { About } from "./Tabs";
import { Members } from "./Members";
import { Card, CardTitle } from "@/components/ui/card";
import bg from "../images/eat.jpg";
export function LandingPage() {
  const [isSmall, setisSmall] = useState(false);
  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  });
  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, []);

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <>
      <main className="h-screen mb-5">
        <Navbar />
        <div className="h-[100vh] relative rounded-t-none rounded-sm">
          <Card className="relative brightness-50 h-[100vh]">
            <img
              src={bg}
              className="w-full h-[100vh] rounded-t-none rounded-sm"
            ></img>
          </Card>
          <CardTitle className="absolute top-1/2 left-1/4 text-6xl text-center text-white ">
            Welcome to the official portal for the
            <br />{" "}
            <span className="text-blue-300">Tinkerer's Lab, IIT Jammu</span>
          </CardTitle>
        </div>
      </main>
      <About />
      <Events />
      <Members />
    </>
  );
}
