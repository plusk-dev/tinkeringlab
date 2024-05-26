import React from "react";
import { Card } from "@/components/ui/card";

export default function Person(props: {
  image: any;
  name: string;
  post: string;
}) {
  return (
    <Card className="flex items-center gap-6 p-6 rounded-lg shadow-md  animate-fade-in info-card ">
      <img
        alt="John Doe"
        className="rounded-full"
        height={64}
        src={props.image}
        style={{
          aspectRatio: "64/64",
          objectFit: "cover",
        }}
        width={64}
      />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">{props.name}</h3>
        </div>
        <div className="text-gray-500 dark:text-gray-400 animate-fade-in-up">
          {props.post}
        </div>
      </div>
    </Card>
  );
}
