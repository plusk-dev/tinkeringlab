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
import { compContext } from "../adminDash";
import React from "react";
import { getUrl } from "@/utils";
import { CloudFog } from "lucide-react";
import { Card } from "@/components/ui/card";
export default function Component() {
  const [allreqs, setAllreqs] = useState<any>([]);
  const [comp, setComp] = useState<any>([]);
  const comps = useContext(compContext);
  useEffect(() => {
    getUrl("/requests/all", {}).then((response) => {
      let data: any = JSON.parse(response.data);
      setAllreqs(data);
      setComp(
        data.filter((item: any) => {
          return item.type === "component";
        })
      );
    });
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="lg:h-[100px] w-full text-black font-semibold text-2xl hover:bg-white info-card flex justify-center items-center">
          Component overview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>Components</DialogHeader>

        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Component</TableHead>
                <TableHead className="text-right">In use</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right bg-red-200">Overdue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comps.map((item) => {
                let compNo = 0;
                let overdue = 0;

                for (let i = 0; i < comp.length; i++) {
                  if (comp[i].component.name == item.name) {
                    compNo++;
                    if (new Date(comp[i].returndate) < new Date()) {
                      overdue++;
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
                      <TableCell
                        className={`${
                          item.name == "" ? "hidden" : "text-right"
                        }`}
                      >
                        {compNo}
                      </TableCell>
                      <TableCell className="text-right">{item.total}</TableCell>
                      <TableCell className="text-right bg-red-200">
                        {overdue}
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
