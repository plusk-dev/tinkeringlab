import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Data {
  name: string;
  type: string;
  id: string;
  status: string
  desc: string
  expiryDate: Date
}

interface ReqProps {
  data: Data;
  updateStatus: (id: string, newStatus: string) => void;
}

const Req: React.FC<ReqProps> = ({ data, updateStatus }) => {

  return (
    <>
      <Card className="bg-transparent border-0 mt-1 shadow-lg	">
        <CardContent className="flex justify-between items-center flex-1 p-0 px-2">
          <h3>{data.name}</h3>
          <h3>{data.type}</h3>
          <Sheet >
            <SheetTrigger asChild className={data.status === "resolved" ? "hidden" : ""}><Button className="mb-1">Open</Button></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Request info</SheetTitle>
              </SheetHeader>
              <div className="mt-5">
                <h3 className="font-bold">Name: <span className="font-normal">{data.name}</span></h3>
                <h3 className="font-bold">Request for:<span className="font-normal">{data.type}</span></h3>
                <h3 className="font-bold">Desc:</h3>
                <p className="border-zinc-500 min-h-10">{data.desc}</p>

              </div>
              <SheetFooter>
                <div className="flex w-full gap-1">
                  <Button className="flex-1" onClick={() => updateStatus(data.id, "resolved")}>Accept</Button>
                  <Button className="flex-1">Reject</Button>
                </div>

              </SheetFooter>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </>
  );
};

export default Req;
