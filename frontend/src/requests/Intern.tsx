import Sidebar from '@/components/ui/Sidebar'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getUrl } from '@/utils';
import React from 'react'
import { useState,useEffect } from 'react';
import Req from './Req';

export default function Intern(){
  const [intern,setIntern]=useState<any>(); 
  useEffect(()=>{
    getUrl("/intern/all",{}).then(response=>setIntern(response.data))
  })

  // const updateStatus = (requestId: string, newStatus: string) => {
  //   const updatedData = intern.map((req:any) => {
  //     if (req.id === requestId) {
  //       return { ...req, status: newStatus };
  //     }
  //     return req;
  //   });
  //   setIntern(updatedData);
  // };

  return <>
    <main className="flex">
      <Sidebar/>
      <Card className="w-full info-card p-2">
        <CardTitle>Intern Requests</CardTitle>
        <CardDescription>A list of Intern requests</CardDescription>
        <CardContent>
          
        </CardContent>
      </Card>
    </main>
  </>
}