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

export default function Component() {

  const [selectedDuration, setSelectedDuration] = useState('');
  const [timeSlots, setTimeSlots] = useState(['Select Duration']);

  const getTimeSlots = (duration:string):string[] => {
    switch (duration) {
      case '1':
        return ['12:00-1:00', '1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00', '5:00-6:00', '6:00-7:00', '7:00-8:00'];
      case '2':
        return ['12-2', '2-4', '4-6','6-8'];
      case '3':
        return ['12-3', '3-6', '6-9'];
      default:
        return ['Pls select Duration'];
    }
  };

  const handleDurationChange = (value:string) => {
    setSelectedDuration(value);
    const slots:string[] = getTimeSlots(value);
    setTimeSlots(slots);
  };




	const [date, setDate] = React.useState<Date>()
	const [isSmall, setisSmall] = React.useState(false);
	window.addEventListener("resize", (_) => {
		setisSmall(window.innerWidth <= 1000);
	})
	React.useEffect(() => {
		setisSmall(window.innerWidth <= 1000);
	}, [])



	return (
		<div className="h-screen parent">
			<Navbar />
			<div className="container pt-8">
				<h1 className="text-3xl">Book a Machine</h1>
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


          <div className={isSmall?"flex flex-col":"flex"}>
          <div className={`flex-1 my-2 ${isSmall?``:`mr-2`}`}>
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

            <div className={`flex-1 ${isSmall?``:`mr-2 my-2 `}`}>
              <Select value={selectedDuration} onValueChange={handleDurationChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="my-2 flex-1">
              <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Time Slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
              </Select>
            </div>
        </div>


				<Textarea placeholder="Purpose of issue..." className="mb-2" />
				<Button className="w-full">Submit</Button>
			</div>
		</div>
	)
}