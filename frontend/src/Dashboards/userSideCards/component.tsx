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
export default function UserComponent() {
  const [allreqs, setAllreqs] = useState<any>([]);
  const [comp, setComp] = useState<any>([]);
  const [comps, setComps] = useState<any>([]);
  useEffect(() => {
    getUrl("/inventory/components/all", {}).then((response) => {
      setComps(response.data.components);
    });
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Component</TableHead>
          <TableHead className="text-center">In use</TableHead>
          <TableHead className="text-center">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comps.map((item: any) => {
          let compNo = 0;
          let overdue = 0;

          for (let i = 0; i < comp.length; i++) {
            if (
              comp[i].approved === true &&
              comp[i].component.name == item.name
            ) {
              compNo++;
            }
          }
          return (
            <>
              <TableRow>
                <TableCell
                  className={`${item.name == "" ? "hidden" : "text-center"}`}
                >
                  {item.name}
                </TableCell>
                <TableCell
                  className={`${item.name == "" ? "hidden" : "text-center"}`}
                >
                  {compNo}
                </TableCell>
                <TableCell className="text-center">{item.total}</TableCell>
              </TableRow>
            </>
          );
        })}
      </TableBody>
    </Table>
  );
}
