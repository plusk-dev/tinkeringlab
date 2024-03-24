import React, { useEffect, useState, useRef } from "react";
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
import Timededo from "@/components/ui/timePicker";
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";
import { getTokenFromStorage, verify_token, deleteTokenFromStorage } from "@/utils";




export default function Component() {

	const [date, setDate] = useState<Date>()
	const { toast } = useToast();
	const navigate = useNavigate()
	const authenticated = useRef(false);
	useEffect(() => {
		if (!authenticated.current) {
			verify_token(getTokenFromStorage()).catch(error => {
				let toastMessage: String = "";
				toastMessage = error.response.data.error;
				toast({
					title: `${toastMessage}`,
					variant: "destructive"
				})
				navigate("/login");
				deleteTokenFromStorage();
			})
			authenticated.current = true;
		}
	}, [])
	return (
		<div className="h-screen parent">
			<Navbar />
			<div className="container pt-8">
				<h1 className="text-3xl">Book a Machine</h1>
				<br />
				<div className="flex gap-2">
					<div className="flex-1">
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



					<div className="flex-1">
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

					<div className={` flex items-center mb-2`}>
						<Timededo text="Start" />
					</div>
					<div className="flex items-center mb-2">
						<Timededo text="End" />
					</div>

				</div>


				<Textarea placeholder="Purpose of issue..." className="mb-2" />
				<Button className="w-full">Submit</Button>
			</div>
		</div>
	)
}