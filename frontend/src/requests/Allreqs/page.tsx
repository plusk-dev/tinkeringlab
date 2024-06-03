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

export default function Allreqs() {
  const [data, setData] = useState<Request[]>([]);

  useEffect(() => {
    getUrl("/requests/all", {}).then((response) => {
      const data = JSON.parse(response.data);
      console.log(data);
      setData(data);
    });
  }, []);

  return (
    <>
      <DataContext.Provider value={data}>
        <main className="w-screen h-screen flex">
          <Sidebar />
          <Card className="w-full h-screen info-card flex flex-col">
            <CardTitle className="m-2 ">All Requests</CardTitle>
            <CardDescription className="m-2 mt-0">
              A history of all the requests
            </CardDescription>

            <div className="flex h-full w-full gap-1 px-1">
              <Card className="flex-1 info-card flex flex-col">
                <CardContent className="p-0 pt-2">
                  <DataTable columns={columns} data={data} />
                </CardContent>
              </Card>
            </div>
          </Card>
        </main>
      </DataContext.Provider>
    </>
  );
}
