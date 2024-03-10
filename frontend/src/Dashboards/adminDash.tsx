import React from "react"
import Sidebar from "@/components/ui/Sidebar"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Table, TableRow, TableHeader, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function AdminDashboard() {

  const [isSmall, setisSmall] = useState(false);
  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  })
  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, [])

  return (
    <>
      <div className={`hover:rounded-lg ${isSmall ? "" : "flex"}`}>
        <Sidebar />
        <div className="flex flex-col w-screen ps-1 pe-1">
          <h1 className="pl-3 pt-3 text-4xl font-medium">Welcome!</h1>
          <div className={`${isSmall ? "flex flex-col" : "flex"}`}>
            <Card className="flex-1 m-1 info-card p-4">
              <CardTitle className="text-xl">Components in use</CardTitle>
              <CardDescription>Overall qty of all components</CardDescription>
              <span className="text-4xl">3/</span><span>10</span>
            </Card>
            <Card className="flex-1 m-1 info-card p-4">
              <CardTitle className="text-xl">Machines in use</CardTitle>
              <CardDescription>all machines in use</CardDescription>
              <span className="text-4xl">3/</span><span>10</span>
            </Card>
            <Card className="flex-1 m-1 info-card p-4">
              <CardTitle className="text-xl">Workstations in use</CardTitle>
              <CardDescription>all workstations in use</CardDescription>
              <span className="text-4xl">3/</span><span>10</span>
            </Card>
            <Card className="flex-1 m-1  danger p-4">
              <CardTitle className="text-xl flex items-center gap-1">
                <AlertTriangle />
                Overdue
              </CardTitle>
              <CardDescription>Overdue parts</CardDescription>
              <span className="text-4xl">3/</span><span>10</span>
            </Card>
          </div>

          <div className={isSmall ? "hidden" : "flex h-full mb-3"}>
            <Card className="min-h-full info-card m-1 flex-1 p-4">
              <CardTitle className="p-1">
                Resources in use
              </CardTitle>
              <div className={isSmall ? "hidden" : "h-4/5 overflow-y-scroll"}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resources</TableHead>
                      <TableHead>Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Components</TableCell>
                      <TableCell>134</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Machines</TableCell>
                      <TableCell>134</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Workstations</TableCell>
                      <TableCell>134</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
            <Card className="min-h-full info-card m-1 flex-1 p-4">
              <CardTitle className="p-1">
                Resources overdue
              </CardTitle>
              <div className={isSmall ? "hidden" : "h-4/5 overflow-y-scroll"}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resources</TableHead>
                      <TableHead>Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Components</TableCell>
                      <TableCell>134</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Machines</TableCell>
                      <TableCell>134</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Workstations</TableCell>
                      <TableCell>134</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </div>
      </div>

    </>

  )
}