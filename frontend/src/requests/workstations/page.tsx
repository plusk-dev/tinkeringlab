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
import { Switch } from "@/components/ui/switch";
import { getUrl } from "@/utils";
import { createContext } from "react";

export const DataContext = createContext([] as Request[]);

export default function ReqWork() {
  const [data, setData] = useState<Request[]>([]);

  useEffect(() => {
    getUrl("/requests/all", {}).then((response) => {
      const data = JSON.parse(response.data);
      console.log(data);
      const workstationRequests = data.filter(
        (item: any) => item.type === "workstation"
      );

      setData(workstationRequests);
    });
  }, []);

  return (
    <>
      <DataContext.Provider value={data}>
        <main className="w-screen h-screen flex">
          <Sidebar />
          <Card className="w-full h-screen info-card flex flex-col">
            <CardTitle className="m-2 ">Workstation Requests</CardTitle>
            <CardDescription className="m-2 mt-0">
              An overview of all the workstation requests
            </CardDescription>

            <div className="flex h-full w-full gap-1 px-1">
              <Card className="flex-1 info-card flex flex-col">
                <CardTitle className="my-2 ml-2 flex justify-between">
                  {"Requests for today"}
                </CardTitle>

                <CardContent className="p-0 pt-2">
                  <DataTable
                    columns={columns}
                    data={data.filter((item) => {
                      return item.approved === false;
                    })}
                  />
                </CardContent>
              </Card>
            </div>
          </Card>
        </main>
      </DataContext.Provider>
    </>
  );
}
