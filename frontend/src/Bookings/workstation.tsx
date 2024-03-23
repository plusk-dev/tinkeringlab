import React from "react";
import "../App.css";
import Navbar from "../components/ui/Navbar";
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
import { Textarea } from "@/components/ui/textarea"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import Timededo from "@/components/ui/timePicker";




export default function Component() {
  
  
	const [date, setDate] = React.useState<Date>()
	

	return (
		<div className="h-screen parent">
			<Navbar />
			<div className="container pt-8">
				<h1 className="text-3xl">Book a Workstation</h1>
				<br />
        <div className="w-full">
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select machine" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="3dp">3-d Printer</SelectItem>
									<SelectItem value="megatron">Megatron</SelectItem>
									<SelectItem value="compuper">Compuper</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
				</div>


          <div className="flex flex-col">
          <div className={`my-2 `}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
              Start Time:
              <div className={`flex flex-col justify-center mb-2`}>
                  
                  <Timededo />
              </div>
              End Time:
              <div className="flex items-center mb-2">
                  <Timededo />
              </div>
                         
        </div>


				<Textarea placeholder="Purpose of issue..." className="mb-2" />
				<Button className="w-full">Submit</Button>
			</div>
		</div>
	)
}