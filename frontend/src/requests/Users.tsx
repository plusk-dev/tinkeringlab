import Sidebar from "@/components/ui/Sidebar";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUrl } from "@/utils";
import React, { useEffect, useState } from "react";
export default function () {
    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        getUrl("/users/all", {}).then(response => {
            console.log(JSON.parse(response.data))
            setUsers(JSON.parse(response.data))
        })
    }, [])
    return <div>
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full ">
                <Card className="info-card  flex-1 w-full ">
                    <CardTitle className="m-2 ">
                        <span>All users</span>
                    </CardTitle>

                    <CardDescription className="m-2 mb-5">List of All Users</CardDescription>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map(user => {
                                    return <TableRow>
                                        <TableCell className="p-2">{user.name}</TableCell>
                                        <TableCell className="p-2">{user.student_id ? user.student_id : "N/A"}</TableCell>
                                        <TableCell className="p-2">{user.email}</TableCell>
                                        <TableCell className="p-2">{user.created_at}</TableCell>
                                        <TableCell className="p-2">koko</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
}