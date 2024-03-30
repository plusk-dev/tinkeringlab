import { TableCell, TableRow } from "@/components/ui/table";
import { Clock, Glasses, LampDesk, Puzzle, Table } from "lucide-react";
import React from "react";
import { Button } from "react-day-picker";

const ICONS:any = {
  'Component': <Puzzle />,
  'Machine': <Clock />,
  'Intern': <Glasses />,
  'Workstation':<LampDesk/>
}

export default function Req2({data,updateStatus}:{data:any,updateStatus:()=>void}){
  <TableRow>
    <TableCell>{ICONS[data.type]}</TableCell>
    <TableCell>{"Hello"}</TableCell>
    <TableCell>{data.created_at}</TableCell>
    <TableCell><Button>Open</Button></TableCell>
  </TableRow>
} 