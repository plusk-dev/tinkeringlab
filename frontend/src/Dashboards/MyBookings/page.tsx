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
import { getTokenFromStorage, getUrl } from "@/utils";
import { jwtDecode } from "jwt-decode";
import Navbar from "@/components/ui/Navbar";

export default function MyBookings() {
  const [data, setData] = useState<Request[]>([]);
  let user: any = jwtDecode(getTokenFromStorage() as string);
  useEffect(() => {
    getUrl("/requests/all", {}).then((response) => {
      const data = JSON.parse(response.data);
      setData(
        data.filter((item: any) => {
          return item.user.email === user.email;
        })
      );
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="w-screen h-screen flex-1 m-1">
        <Card className="w-full h-full info-card flex flex-col">
          <CardTitle className="m-2 ">All Requests</CardTitle>
          <CardDescription className="m-2 mt-0">
            A history of all the requests by you
          </CardDescription>

          <Card className="flex-1 info-card flex flex-col">
            <DataTable columns={columns} data={data} />
          </Card>
        </Card>
      </main>
    </>
  );
}
