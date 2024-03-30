import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Puzzle, Glasses } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Data {
  name: string;
  type: string;
  id: string;
  status: string
  description: string
  expiryDate: Date
}

interface ReqProps {
  data: Data;
  updateStatus: (id: string, newStatus: string) => void;
}

const ICONS:any = {
  'Component': <Puzzle />,
  'Machine': <Clock />,
  'Intern': <Glasses />
}

const Req: React.FC<ReqProps> = ({ data, updateStatus }) => {
  return (
    <>
      <Card className={`mt-1 ${data.status === "resolved" ? "bg-pink-400" : "bg-blue-200"} border-blue-700	border-[1px] border-dashed`}>
        <CardContent className="flex justify-between items-center p-0 px-1 mt-1">
          <h3 className="pb-1 flex gap-2">{ICONS[data.type]}{data.name}</h3>
          {/* <h3 className="pb-1">{data.type}</h3> */}
          <Sheet >
            <SheetTrigger asChild ><Button className="mb-1">Open</Button></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Request info</SheetTitle>
              </SheetHeader>
              <div className="mt-5">
                <h3 className="font-bold text-lg text-gray-500">Name: <br/></h3><span className="font-normal">{data.name}</span>
                <h3 className="font-bold text-lg text-gray-500">Request for:<br/></h3><span className="font-normal">{data.type}</span>
                <h3 className="font-bold text-lg text-gray-500">Desc:</h3>
                <p className="border-zinc-500 min-h-10">{data.description}</p>

              </div>
              <SheetFooter>
                <div className="flex w-full gap-1">
                  <Button className={data.status === "resolved" ? "hidden" : "flex-1"} onClick={() => updateStatus(data.id, "resolved")}>Accept</Button>
                  <Button className={data.status === "resolved" ? "hidden" : "flex-1"}>Reject</Button>
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
