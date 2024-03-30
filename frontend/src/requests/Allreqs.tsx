import Sidebar from "@/components/ui/Sidebar";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { getVerifiedUrl } from "@/utils";
import React, { useEffect, useState } from "react";
import Req from "./Req";
import InfiniteScroll from "react-infinite-scroll-component";




export default function Allreqs() {
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [reqs, setReqs] = useState<any[]>([])
    const [session,setsession]=useState<any[]>([])
    const [components,setComponents]=useState<any[]>([])
    const [workstation,setWorkstation]=useState<any[]>([])
    

    useEffect(() => {
        getVerifiedUrl("//all", {}).then(response => {
            console.log(reqs)
            const data=JSON.parse(response.data);
            setsession(data.machine_bookings);
            setComponents(data.component_bookings);
            setWorkstation(data.workstation_bookings);
            
        })
    }, [])

    const updateStatus = (requestId: string, newStatus: string) => {
        const updatedData = session.map((req: any) => {
            if (req.id === requestId) {
                return { ...req, status: newStatus };
            }
            return req;
        });
        setsession(updatedData);
    };

    return (<>
        <div className="flex w-screen">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Card className="flex-1 info-card p-2">
                    <CardTitle className="ml-2 mt-1">All Requests</CardTitle>
                    <CardDescription className="ml-2">A List of all requests</CardDescription>
                    <CardContent>
                        {
                            session.map((item)=>{
                                return <Req key={item.id} data={item} updateStatus={updateStatus}></Req>
                            })
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    </>)
}

