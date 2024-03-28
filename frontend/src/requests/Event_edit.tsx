import Sidebar from "@/components/ui/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const events=[
  {
    img:"https://preview.redd.it/sad-hamster-v0-lc48795mb0kc1.jpeg?auto=webp&s=9ad5413169440169bef6f9619de260333841f33d",
    description:"shanivar raati mainu neend nai aati RAAAAAAAAAAAAAAAAAAAAAA"
  }
]


export default function Land(){
  const [isEditing,setIsEditing]=useState<boolean>(false);

  return <> 
    <div className="flex flex-col  lg:flex-row">
    <Sidebar/>
    <Card className="info-card flex-1">
      <CardTitle className="m-2 flex justify-between">
        Landing Page
        <Button onClick={()=>{
                setIsEditing(!isEditing)
              }}>{isEditing?"Exit Edit Mode":"Edit Mode"}
        </Button>
      </CardTitle>

      <CardContent>
        <Table>
          <TableHeader>
            <TableHead>Image</TableHead>
            <TableHead>Description</TableHead>
            
           
            
          </TableHeader>

           <TableBody>
              {
                events.map(item=>{
                  
                  return !isEditing?
                  <TableRow className="object-contain max-h-12" >
                    <TableCell className="object-contain max-h-12"><img className="w-28 h-28"  src={item.img}/></TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>:
                  <TableRow>
                    <TableCell> <img className="w-28 h-28"  src={item.img}/> <br /><Input type="file" className="hover:cursor-pointer max-w-80" /></TableCell>
                    <TableCell><Textarea value={item.description} /></TableCell>
                  </TableRow>
                })
              }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
  </>
}