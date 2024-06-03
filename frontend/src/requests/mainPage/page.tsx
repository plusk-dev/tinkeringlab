import Sidebar from "@/components/ui/Sidebar";
import { Request, columns } from "./Columns";
import { DataTable } from "./Datatable";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { getUrl } from "@/utils";
import { createContext } from "react";

export const DataContext = createContext([] as Request[]);

export default function ReqHandler() {
  const [data, setData] = useState<Request[]>([]);

  useEffect(() => {
    getUrl("/requests/all", {}).then((response) => {
      const data = JSON.parse(response.data);
      setData(
        data.filter((item: any) => {
          return item.approved === false;
        })
      );
    });
  }, []);

  return (
    <>
      <DataContext.Provider value={data}>
        <main className="w-full flex-1 m-1">
          <Card className="w-full h-full info-card flex flex-col">
            <CardTitle className="m-2 ">All Requests</CardTitle>
            <CardDescription className="m-2 mt-0">
              A history of all the requests
            </CardDescription>

            <Card className="flex-1 info-card flex flex-col">
              <DataTable columns={columns} data={data} />
            </Card>
          </Card>
        </main>
      </DataContext.Provider>
    </>
  );
}
