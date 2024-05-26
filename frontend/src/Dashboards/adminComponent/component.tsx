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
export default function Component() {
  const [complen, setComplen] = useState();
  const [allreqs, setAllreqs] = useState([]);
  const [sessionlen, setSessionlen] = useState();
  const [worklen, setWorklen] = useState();
  const comps = useContext(compContext);
  useEffect(() => {
    getUrl("/requests/all", {}).then((response) => {
      setAllreqs(JSON.parse(response.data));
    });
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Available components</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Invoices</DialogTitle>
        </DialogHeader>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Component</TableHead>
                <TableHead className="text-right">Available</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comps.map((item) => {
                return (
                  <>
                    <TableRow>
                      <TableCell>{item.name}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
