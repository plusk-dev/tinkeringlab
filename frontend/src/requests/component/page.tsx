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

export default function ReqComp() {
  const [data, setData] = useState<Request[]>([]);
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    getUrl("/requests/all", {}).then((response) => {
      console.log(response.data);
      const data = JSON.parse(response.data);
      const beebop = data.filter((item: any) => item.type === "component");
      setData(beebop);
    });
  }, []);

  return (
    <>
      <DataContext.Provider value={data}>
        <main className="w-screen h-screen flex">
          <Sidebar />
          <Card className="w-full h-screen info-card flex flex-col">
            <CardTitle className="m-2 ">Component Requests</CardTitle>
            <CardDescription className="m-2 mt-0">
              An overview of all the component requests
            </CardDescription>

            <div className="flex h-full w-full gap-1 px-1">
              {/*This card for the pending and active requests */}
              <Card className="flex-1 info-card flex flex-col">
                {/* This is the title of the sub-card (pending/active)*/}
                <CardTitle className="my-2 ml-2 flex justify-between">
                  {pending ? "Pending Requests" : "Active Requests"}
                  <Switch
                    className=" shadow-md shadow-slate-300"
                    onClick={() => {
                      setPending(!pending);
                    }}
                  />
                </CardTitle>

                <CardContent className="p-0 pt-2">
                  <DataTable
                    columns={columns}
                    data={data.filter((item) => {
                      console.log(new Date());
                      return pending
                        ? item.approved === false &&
                            new Date(item.returndate) > new Date()
                        : item.approved === true &&
                            new Date(item.returndate) > new Date();
                    })}
                  />
                </CardContent>
              </Card>
              <Card className="flex-1 info-card flex flex-col">
                {/* This is the title of the sub-card (pending/active)*/}
                <CardTitle className="my-2 ml-2 flex justify-between">
                  Overdue Requests
                </CardTitle>

                <CardContent className="p-0 pt-2">
                  <DataTable
                    columns={columns}
                    data={data.filter((item) => {
                      return new Date(item.returndate) < new Date();
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
