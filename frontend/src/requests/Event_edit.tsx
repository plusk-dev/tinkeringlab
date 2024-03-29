import Sidebar from "@/components/ui/Sidebar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { getUrl, postUrl } from "@/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
interface eventType {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  event_date: Date;
  img_name: string;
  on_landing_page: boolean;
}


export default function Land() {
  const [events, setEvents] = useState<eventType[]>([])
  const [date, setDate] = React.useState<Date>()
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [file, setFile] = useState<any | null>()
  useEffect(() => {
    getUrl("/landing/all", {}).then(response => {
      setEvents(JSON.parse(response.data))
    })
  }, [])

  return <>
    <div className="flex flex-col  lg:flex-row">
      <Sidebar />
      <Card className="info-card flex-1">
        <CardTitle className="m-2 flex justify-between">
          Landing Page
        </CardTitle>
        <div className="px-8 pt-4">
          <div className="flex gap-2">
            <Input placeholder="Title of event" className="mb-2" onChange={e => setTitle(e.target.value)} />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Input type="file" className="max-w-64 cursor-pointer" onChange={e => { console.log(typeof e.target.files?.[0]); setFile(e.target.files?.[0]) }} />
          </div>
          <Textarea placeholder="Description" className="mb-2" onChange={e => setDescription(e.target.value)} />
          <Button onClick={() => {
            let fd: FormData = new FormData();
            console.log(JSON.stringify(date?.toISOString()))
            fd.append('title', String(title))
            fd.append('description', String(description))
            fd.append('event_date', JSON.stringify(date?.toISOString()))
            fd.append('in_file', file)
            axios.post("http://127.0.0.1:5000/landing/create", fd, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }).then(_ => {
              getUrl("/landing/all", {}).then(response => {
                setEvents(JSON.parse(response.data))

                if(response.status===200){
                  toast({
                    title:"Event added successfully",
                    variant:"success"
                  })
                }
                else{
                  toast({
                    title:"Call Yuvraj or Satvic",
                    variant:"destructive"
                  })
                }
              })
            })
          }}>Create New Event</Button>
        </div>
        <CardContent>
          <Table>
            <TableHeader>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Public</TableHead>
              <TableHead>Remove</TableHead>
            </TableHeader>
            <TableBody>
              {
                events.map(item => {
                  return (
                    <TableRow className="object-contain max-h-12" >
                      <TableCell className="object-contain max-h-12 w-[200px]"><img className="w-[80%]" src={`http://127.0.0.1:5000/static/${item.img_name}`} /></TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{JSON.stringify(item.event_date).replace('"', "").split(" ")[0]}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell><input onChange={e => {
                        let newEvents: eventType[] = [];
                        events.forEach(event => {
                          if (event.id === item.id) {
                            newEvents.push({
                              id: event.id,
                              title: event.title,
                              description: event.description,
                              created_at: event.created_at,
                              on_landing_page: !(event.on_landing_page),
                              event_date: event.event_date,
                              img_name: event.img_name
                            })
                            postUrl("/landing/update", { id: event.id }).then(response=>{
                              if(response.status===200 && !event.on_landing_page){
                                toast({
                                  title:"Event is now on the Landing Page",
                                  variant:"success"
                                })
                              }
                              else{
                                toast({
                                  title:"Removed from landing page",
                                  variant:"destructive"
                                })
                              }
                            });
                          } else {
                            newEvents.push(event)
                          }
                        })
                        setEvents(newEvents);
                      }} type='checkbox' className="w-6 h-6 cursor-pointer" checked={item.on_landing_page}></input></TableCell>
                      <TableCell><Button variant={"destructive"} onClick={() => {
                        postUrl("/landing/delete", { id: item.id }).then(_ => {
                          getUrl("/landing/all", {}).then(response => {
                            setEvents(JSON.parse(response.data))
                            if(response.status===200){
                              
                              toast(
                                {
                                  title:"Removed successfully",
                                  variant:"success"
                                }
                              )
                            }else{
                              toast({
                                title:"Some Error Occured",
                                variant:"destructive"
                              })
                            }
                          })
                        });

                      }}>Remove</Button></TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </>
}