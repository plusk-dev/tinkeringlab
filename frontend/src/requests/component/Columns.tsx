import { ColumnDef } from "@tanstack/react-table";
import { Clock, Glasses, LampDesk, Puzzle } from "lucide-react";
import React from "react";

export type Request = {
  id: number;
  user_id: number;
  component_id: number;
  description: number;
  created_at: string;
  returndate: string;
  approved: boolean;
  approver_id: number | null;
  user: any;
  type: string;
};

const ICONS: any = {
  component: <Puzzle />,
  session: <Clock />,
  intern: <Glasses />,
  workstation: <LampDesk />,
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const hello: string = row.getValue("type");
      return <div>{ICONS[hello]}</div>;
    },
  },
  {
    accessorKey: "user.name",
    header: "Name",
  },
  {
    accessorKey: "user.student_id",
    header: "Id",
  },
  {
    accessorKey: "created_at",
    header: "Booking",
    cell: ({ row }) => {
      const date: string = row.getValue("created_at");
      return <div>{date.split(" ")[0]}</div>;
    },
  },
];
