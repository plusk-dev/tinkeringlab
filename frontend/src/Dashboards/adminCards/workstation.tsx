import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { getUrl } from "@/utils";

export default function Workstation() {
  const [work, setWork] = useState<any>([]);
  const [workInv, setworkInv] = useState<any>([]);
  useEffect(() => {
    getUrl("/requests/all", {}).then((response) => {
      let data: any = JSON.parse(response.data);
      setWork(
        data.filter((item: any) => {
          return item.type === "workstation";
        })
      );
    });
    getUrl("/inventory/workstations/all", {}).then((response) => {
      setworkInv(response.data.workstations);
    });
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="lg:h-[100px] w-full text-black font-semibold text-2xl hover:bg-white info-card flex justify-center items-center">
          Workstation Overview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>Workstation overview</DialogHeader>

        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Session</TableHead>
                <TableHead className="text-right">Requests</TableHead>
                <TableHead className="text-right">Requests for today</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workInv.map((item: any) => {
                let workNo = 0;
                let workForToday = 0;

                for (let i = 0; i < work.length; i++) {
                  if (work[i].workstation.name == item.name) {
                    workNo++;
                    if (
                      new Date(work[i].start).getDate() === new Date().getDate()
                    ) {
                      workForToday++;
                    }
                  }
                }
                return (
                  <>
                    <TableRow>
                      <TableCell
                        className={`${item.name == "" ? "hidden" : ""}`}
                      >
                        {item.name}
                      </TableCell>

                      <TableCell className="text-right">{workNo}</TableCell>
                      <TableCell className="text-right">
                        {workForToday}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
