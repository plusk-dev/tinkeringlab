import React from "react"
import Sidebar from "@/components/ui/Sidebar"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react";
import ReqHandler from "@/requests/reqhandler";

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
      <div className={`hover:rounded-lg ${isSmall ? "" : "flex"} max-h-screen`}>
        <Sidebar />
        <div className="flex flex-col w-screen ps-1 pe-1 max-h-screen overflow-auto">
        <div className="flex m-1">
					<Card className="w-full flex info-card">
						<div className="diamond-shape m-5 h-14 w-14"></div>
						<h1 className="text-3xl tracking-tight pl-2 font-medium flex items-center">
							Welcome! Vikas</h1>
					</Card>
				</div>

          <div className={isSmall ? "" : "flex-1 flex h-full mb-1"}>
            <ReqHandler></ReqHandler>
    
            <Card className="h-full info-card m-1 flex-1 p-4">    
              <div className={isSmall ? "" : "h-full flex flex-col overflow-y-scroll"}>
                <div className="flex-1 flex flex-col gap-1">
                  <CardTitle>Components</CardTitle>
                  <div className="flex flex-1">
                    <Card className="flex-1 m-1 info-card p-4">
                      <CardTitle className="text-xl">Issued</CardTitle>
                      <CardDescription>Components being used</CardDescription>
                      <span className="text-4xl">3/</span><span>10</span>
                    </Card>
                    <Card className="flex-1 m-1 danger p-4">
                      <CardTitle className="text-xl">Overdue </CardTitle>
                      <CardDescription>Overdue components</CardDescription>
                      <span className="text-4xl">3/</span><span>10</span>
                    </Card>
                  </div>
                  <CardTitle>Machines</CardTitle>
                  <div className="flex flex-1">
                    <Card className="flex-1 m-1 info-card p-4">
                      <CardTitle className="text-xl">In use</CardTitle>
                      <CardDescription>all machines in use</CardDescription>
                      <span className="text-4xl">3/</span><span>10</span>
                    </Card>
                    <Card className="flex-1 m-1 danger p-4">
                      <CardTitle className="text-xl">Overdue</CardTitle>
                      <CardDescription>machines overused</CardDescription>
                      <span className="text-4xl">3/</span><span>10</span>
                    </Card>
                  </div>
                  <CardTitle>Workstations</CardTitle>
                  <div className="flex flex-1">
                    <Card className="flex-1 m-1 info-card p-4">
                      <CardTitle className="text-xl">Workstations in use</CardTitle>
                      <CardDescription>all workstations in use</CardDescription>
                      <span className="text-4xl">3/</span><span>10</span>
                    </Card>
                    <Card className="flex-1 m-1 danger p-4">
                      <CardTitle className="text-xl">Overdue</CardTitle>
                      <CardDescription>workstations overused</CardDescription>
                      <span className="text-4xl">3/</span><span>10</span>
                    </Card>
                  </div>
                </div>
                
              </div>
            </Card>
          </div>
        </div>
      </div>

    </>

  )
}