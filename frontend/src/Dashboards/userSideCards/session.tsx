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

export default function UserSession() {
  const [sessionsInv, setSessionsInv] = useState<any>([]);
  useEffect(() => {
    getUrl("/inventory/machines/all", {}).then((response) => {
      setSessionsInv(response.data.machines);
    });
  }, []);
  return (
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Session</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessionsInv.map((item: any) => {
            return (
              <>
                <TableRow>
                  <TableCell className={`${item.name == "" ? "hidden" : ""}`}>
                    {item.name}
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
