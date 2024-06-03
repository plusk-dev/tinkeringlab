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

export default function Session() {
  const [sess, setSess] = useState<any>([]);
  const [sessionsInv, setSessionsInv] = useState<any>([]);
  useEffect(() => {
    getUrl("/requests/all", {}).then((response) => {
      let data: any = JSON.parse(response.data);
      setSess(
        data.filter((item: any) => {
          return item.type === "session";
        })
      );
    });
    getUrl("/inventory/machines/all", {}).then((response) => {
      setSessionsInv(response.data.machines);
    });
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="lg:h-[100px] w-full text-black font-semibold text-2xl hover:bg-white info-card flex justify-center items-center">
          Session Overview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>Sessions</DialogHeader>

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
              {sessionsInv.map((item: any) => {
                let sessNo = 0;
                let sessForToday = 0;

                for (let i = 0; i < sess.length; i++) {
                  if (sess[i].machine.name == item.name) {
                    sessNo++;
                    if (
                      new Date(sess[i].start).getDate() === new Date().getDate()
                    ) {
                      sessForToday++;
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

                      <TableCell className="text-right">{sessNo}</TableCell>
                      <TableCell className="text-right">
                        {sessForToday}
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
