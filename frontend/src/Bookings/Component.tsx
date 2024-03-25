import React from "react";
import { useState, useEffect, useRef } from "react";
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
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";
import { getTokenFromStorage, verify_token, deleteTokenFromStorage, getUrl, postUrl } from "@/utils";
import { jwtDecode } from "jwt-decode";


export default function Component() {
	const fetchedComponents = useRef(false);
	const [components, setComponents] = useState<{ id: number, name: string; quantity: number }[]>([]);
	const [selectedComp, setSelectedComp] = useState<Number>()
	const [desc, setDesc] = useState<String>("")
	const [date, setDate] = useState<Date>()
	const [isSmall, setisSmall] = useState(false);
	const { toast } = useToast();
	const navigate = useNavigate()
	const authenticated = useRef(false);
	window.addEventListener("resize", (_) => {
		setisSmall(window.innerWidth <= 1000);
	})
	useEffect(() => {
		setisSmall(window.innerWidth <= 1000);
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
		getUrl("/inventory/components/all", {}).then(response => {
			if (fetchedComponents.current == false) {
				let newComponents: { id: number, name: string; quantity: number }[] = [];

				response.data.components.forEach((component: any) => {
					newComponents.push({ id: component.id, name: component.name, quantity: component.total })
				});
				setComponents(newComponents);
				fetchedComponents.current = true;
			}
		})
	}, [])

	return (
		<div className="h-screen parent">
			<Navbar />
			<div className="container pt-8">
				<h1 className="text-3xl">Issue a component</h1>
				<br />
				<div className={isSmall ? "" : "flex gap-2"}>
					<div className="w-full">
						Select a component
						<Select onValueChange={(e) => {
							setSelectedComp(parseInt(e));
						}}>
							<SelectTrigger>
								<SelectValue placeholder="Select a component" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Components</SelectLabel>
									{components.map(item => {
										return <SelectItem value={JSON.stringify(item.id)}>{item.name}</SelectItem>
									})}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="w-1/2">
						Date of return <br />
						<Popover >
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
				</div>
				Purpose of issue:
				<Textarea onChange={(e) => setDesc(e.target.value)} placeholder="Purpose of issue..." className="mb-2" />
				<Button className="w-full" onClick={() => {
					console.log(jwtDecode(JSON.stringify(getTokenFromStorage())))
					if (getTokenFromStorage()) {
						postUrl("/bookings/component/create", {
							email: (jwtDecode(JSON.stringify(getTokenFromStorage())) as { email: string, iat: number }).email,
							component_id: selectedComp,
							returndate: date,
							approved: false,
							description: desc,
						})
					}
				}}>Submit</Button>
			</div>
		</div>
	)
}