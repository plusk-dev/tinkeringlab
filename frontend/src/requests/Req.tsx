import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import data from "./testData";

interface Data {
  name: string;
  type: string;
  id: string;
}


const Req: React.FC<Data> = (props) => {
  return (
    <>
      <Card className="info-card">
        <CardContent className="flex justify-between flex-1 mt-5">
          <h2 className="font-medium">{props.name}</h2>
          <h2>{props.type}</h2>
        </CardContent>
      </Card>
    </>
  );
};

export default Req;
