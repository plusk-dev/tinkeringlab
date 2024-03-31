import Sidebar from "@/components/ui/Sidebar";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { getUrl } from "@/utils";
import React, { useEffect, useState } from "react";
import { Table } from "@/components/ui/table";
import { TableBody, TableHead, TableHeader } from "@/components/ui/table";
import Req2 from "./Req2";



export default function Allreqs() {
    const [reqs, setReqs] = useState<any[]>([])
    useEffect(() => {
        getUrl("/requests/all", {}).then((response) => {
            setReqs(JSON.parse(response.data))
        })
    }, [])


    return (<>
        <div className="lg:flex w-screen ">
        <Sidebar />     
            <div className="flex-1 flex flex-col">
                <Card className="flex-1 info-card p-2 ">
                    <CardTitle className="ml-2 mt-1">All Requests</CardTitle>
                    <CardDescription className="ml-2">A List of all requests</CardDescription>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableHead>Type</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Type</TableHead>
                            </TableHeader>
                            <TableBody>
                                {reqs.map((item) => {
                                    return <Req2 data={item} />
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>)
}

