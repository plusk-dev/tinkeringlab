import { TableCell, TableRow } from "@/components/ui/table";
import { Clock, Glasses, LampDesk, Puzzle, Table } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { getTokenFromStorage, getUrl, postUrl } from "@/utils";
import { jwtDecode } from "jwt-decode";

const ICONS: any = {
  'component': <Puzzle />,
  'session': <Clock />,
  'intern': <Glasses />,
  'workstation': <LampDesk />
}


export default function Req2(item: any) {
  const [remarks, setRemarks] = useState<string>("");

  return <TableRow>
    <TableCell className="p-1">{ICONS[item.data.type]}</TableCell>
    <TableCell className="p-1">{item.data.user.name}</TableCell>
    <TableCell className="p-1">{item.data.user.student_id.toUpperCase()}</TableCell>
    <TableCell className="p-1">{item.data.created_at.split(".")[0].split(" ")[0].split("-").reverse().join("-")}</TableCell>
    <TableCell className="p-1">{item.data.created_at.split(".")[0].split(" ")[1]}</TableCell>
    <TableCell className="p-1">
      <Sheet onOpenChange={e => {
        getUrl("/remarks/get_remarks", { request_id: item.data.id, request_type: item.data.type }).then(response => {
          console.log(JSON.parse(response.data));
        })
      }}>
        <SheetTrigger asChild ><Button className="mb-1">Open</Button></SheetTrigger>
        <SheetContent >
          <SheetHeader>
            <SheetTitle>Request info</SheetTitle>
          </SheetHeader>
          <div className="mt-5">
            <h3 className="font-bold text-lg text-gray-500">Name: <br /></h3><span className="font-normal">{item.data.user.name}</span>
            <h3 className="font-bold text-lg text-gray-500">Request for:<br /></h3><span className="font-normal">{item.data.type}</span>
            <h3 className="font-bold text-lg text-gray-500">Desc:</h3>
            <p className="border-zinc-500 min-h-10">{item.data.description}</p>
          </div>
          <Textarea placeholder="Remarks" className="mb-3" onChange={(e) => { setRemarks(e.target.value) }} />
          <div className="flex justify-end">
            <Button className="mb-2 flex" size={'sm'} onClick={() => {
              postUrl("/remarks/create", {
                content: remarks,
                email: (jwtDecode(JSON.stringify(getTokenFromStorage())) as { email: string, iat: number }).email,
                request_type: item.data.type,
                request_id: item.data.id,
              })
            }}>+ Add Remark</Button>
          </div>

          <SheetFooter>
            <div className="flex w-full gap-1">
              <Button className={item.status === "resolved" ? "hidden" : "flex-1"}>Accept</Button>
              <Button className={item.status === "resolved" ? "hidden" : "flex-1"}>Reject</Button>
            </div>

          </SheetFooter>
        </SheetContent>
      </Sheet>
    </TableCell>
  </TableRow>
} 