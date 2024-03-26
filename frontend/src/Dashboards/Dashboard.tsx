import React from "react";
import "../App.css"
import Navbar from "../components/ui/Navbar";
import {
	Card,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { useState, useEffect, useRef } from "react";
import { getTokenFromStorage, verify_token, deleteTokenFromStorage } from "@/utils";
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
	const { toast } = useToast();
	const navigate = useNavigate()
	const [isSmall, setisSmall] = useState(false);
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
	}, [])

	return (
		<div className="h-screen parent">
			<Navbar />
			<div className="p-4 pt-4 h-5/6">
				<div className="flex">
					<Card className="w-full flex info-card">
						<div className="diamond-shape m-5 h-14 w-14"></div>
						<h1 className="text-3xl tracking-tight pl-2 font-medium flex items-center">
							Welcome! User</h1>
					</Card>
				</div>
				<div className={isSmall ? "gap-4 header-cards" : "pt-4 gap-4 header-cards flex h-full"}>
					<Card className={isSmall ? "p-4 mt-2 drop-shadow-xl info-card max-h-1/2" : "drop-shadow-xl w-screen p-4 info-card"}>
						<CardTitle>Components Available</CardTitle>
						<CardDescription className="mt-2">Number of components available at the Tinkering Lab right now.</CardDescription>
						<span className="text-4xl">45/</span><span>70</span>
						<div className={isSmall ? "" : "overflow-y-scroll"}>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Component</TableHead>
										<TableHead>Qty</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>Screw</TableCell>
										<TableCell>134</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</Card>
					<Card className={isSmall ? "p-4 mt-2 drop-shadow-xl info-card" : "drop-shadow-xl w-screen p-4 info-card"}>
						<CardTitle>Workstations Available</CardTitle>
						<CardDescription className="mt-2">Number of workstations available at the Tinkering Lab right now.</CardDescription>
						<span className="text-4xl">3/</span><span>10</span>

					</Card>
					<Card className={isSmall ? "p-4 mt-2 drop-shadow-xl info-card" : "drop-shadow-xl w-screen p-4 info-card"}>
						<CardTitle>Machines Available</CardTitle>
						<CardDescription className="mt-2">Number of machines available at the Tinkering Lab right now.</CardDescription>
						<span className="text-4xl">1/</span><span>3</span>
					</Card>
				</div>
			</div>
		</div>
	);
}
