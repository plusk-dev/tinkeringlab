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
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";
import { getTokenFromStorage, verify_token, deleteTokenFromStorage, getUrl } from "@/utils";
import { postUrl } from "@/utils";
import { jwtDecode } from "jwt-decode";



export default function Component() {
	const [start, setStart] = useState<string>("");
	const [end, setEnd] = useState<string>("");
	const fetchedMachines = useRef(false);
	const [machines, setMachines] = useState<{ id: number, name: string }[]>([])
	const [date, setDate] = useState<Date>()
	const [Mach, setMach] = useState<Number>()
	const [desc, setDesc] = useState<String>("")
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
		getUrl("/inventory/machines/all", {}).then(response => {
			console.log(response)
			if (fetchedMachines.current == false) {
				let newMachines: { id: number, name: string }[] = [];

				response.data.machines.forEach((machine: any) => {
					newMachines.push({ id: machine.id, name: machine.name })
				});
				setMachines(newMachines);
				fetchedMachines.current = true;
			}
		})
	}, [])
	return (
		<div className="h-screen parent">
			<Navbar />
			<div className="container pt-8">
				<h1 className="text-3xl">Book a Training Session</h1>
				<br />
				<div className="flex gap-2">
					<div className="flex-1">
						<Select onValueChange={(e) => { setMach(parseInt(e)) }}>
							<SelectTrigger>
								<SelectValue placeholder="Select training session" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{machines.map((item) => {
										return <SelectItem value={JSON.stringify(item.id)}>{item.name}</SelectItem>
									}
									)}
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
						<div className={`relative w-full`}>
							<input
								onChange={(e) => {
									setStart(e.target.value)
								}}
								type="time"
								className={`w-full h-10 rounded-lg pl-12`}
							/>
							<span
								className={`absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500`}
								style={{ zIndex: 10 }}
							>
								Start
							</span>
						</div>
					</div>
					<div className="flex items-center mb-2">
						<div className={`relative w-full`}>
							<input
								onChange={(e) => {
									setEnd(e.target.value)
								}}
								type="time"
								className={`w-full h-10 rounded-lg pl-12`}
							/>
							<span
								className={`absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500`}
								style={{ zIndex: 10 }}
							>
								End
							</span>
						</div>
					</div>

				</div>


				<Textarea onChange={(e) => { setDesc(e.target.value) }} placeholder="Purpose of issue..." className="mb-2" />
				<Button className="w-full" onClick={(e: any) => {
					e.target.disabled = true;
					if (getTokenFromStorage()) {
						console.log(date)
						let newstart: Date | undefined = date;
						newstart?.setHours(parseInt(start.split(":")[0]));
						newstart?.setMinutes(parseInt(start.split(":")[1]));
						setStart(JSON.stringify(newstart?.toISOString()));
						let newend: Date | undefined = date;
						newend?.setHours(parseInt(end.split(":")[0]));
						newend?.setMinutes(parseInt(end.split(":")[1]));
						setEnd(JSON.stringify(newend?.toISOString()));

						postUrl("/bookings/machine/create", {
							email: (jwtDecode(JSON.stringify(getTokenFromStorage())) as { email: string, iat: number }).email,
							machine_id: Mach,
							start: newstart?.toISOString(),
							end: newend?.toISOString(),
							description: desc,
						}).then(response => {
							if (response.status == 200) {
								toast({
									title: "Request successfully sent",
									variant: "success"
								})
							}
						}
						)
					}

				}}>Submit</Button>
			</div>
		</div>
	)
}