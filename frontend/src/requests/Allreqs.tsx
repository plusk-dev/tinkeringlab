import Sidebar from "@/components/ui/Sidebar";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { getVerifiedUrl } from "@/utils";
import React, { useEffect, useState } from "react";
import Req from "./Req";
import InfiniteScroll from "react-infinite-scroll-component";

function compareFn(a:any,b:any){
    if(a.created_at<b.created_at){
        return -1;
    }
    if(a.created_at<b.created_at){
        return 1;
    }
    return 0;
}

const fetchMoreData=()=>{

}


export default function Allreqs() {
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [reqs, setReqs] = useState<any[]>([])

    useEffect(() => {
        getVerifiedUrl("/bookings/all", {}).then(response => {
            setReqs((JSON.parse(response.data)).sort(compareFn));
        })
    }, [])

    const updateStatus = (requestId: string, newStatus: string) => {
        const updatedData = reqs.map((req: any) => {
            if (req.id === requestId) {
                return { ...req, status: newStatus };
            }
            return req;
        });
        setReqs(updatedData);
    };

    return (<>
        <div className="flex">
            <Sidebar />
            <Card className="w-full info-card">
                <CardTitle className="ml-2 mt-1">All Requests</CardTitle>
                <CardDescription className="ml-2">A List of all requests</CardDescription>
            </Card>
            <CardContent>
                
            </CardContent>
        </div>
    </>)
}

