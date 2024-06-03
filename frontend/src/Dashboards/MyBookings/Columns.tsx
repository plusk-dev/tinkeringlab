import { ColumnDef } from "@tanstack/react-table";
import { Clock, Glasses, LampDesk, Puzzle } from "lucide-react";
import React from "react";

export type Request = {
  id: number;
  user_id: number;
  workstation_id: number;
  machine_id: number;
  returndate: string;
  component_id: number;
  description: number;
  created_at: string;
  start: string;
  end: string;
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

export const columns: ColumnDef<Request>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type: string = row.getValue("type");
      return <div>{ICONS[type]}</div>;
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
    header: () => {
      return <div className="hidden"></div>;
    },
  },
  {
    accessorKey: "start",
    header: "Timings",
    cell: ({ row }) => {
      let date: string = "";
      if (row.getValue("type") === "component") {
        date = row.getValue("created_at");
      } else {
        date = row.getValue("start");
      }
      return <div>{date.split(" ")[0].split("-").reverse().join("-")}</div>;
    },
  },
];
