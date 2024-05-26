import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Person from "./person";
import RISHIKA from "../images/RISHIKA.jpg";
import nivedita from "../images/nivedita.jpg";
import SAhil from "../images/SAhil.jpg";
import ATHARVA from "../images/ATHARVA.png";
import Tanisha from "../images/Tanisha.jpg";
import khushboo from "../images/khushboo.jpg";
import Shaurya_gupta from "../images/Shaurya_gupta.jpg";
import { useEffect, useState } from "react";

export function Members() {
  const [isSmall, setisSmall] = useState(false);
  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  });
  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, []);
  return (
    <>
      <Card className="mt-5 info-card">
        <CardHeader>
          <CardTitle className="text-[#003f87] text-center">
            Meet our Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            data-aos="fade-up"
            data-aos-delay="50"
            className={
              isSmall
                ? "cards"
                : "cards flex flex-wrap justify-center gap-2 container mx-auto"
            }
          >
            <Person image={RISHIKA} name={"Rishika"} post={"post"} />
            <Person image={nivedita} name={"Nivedita"} post={"post"} />
            <Person image={SAhil} name={"Sahil"} post={"post"} />
            <Person image={ATHARVA} name={"Atharva"} post={"post"} />
            <Person image={Tanisha} name={"Tanisha"} post={"post"} />
            <Person image={khushboo} name={"Khushboo"} post={"post"} />
            <Person image={Shaurya_gupta} name={"Shaurya"} post={"post"} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
