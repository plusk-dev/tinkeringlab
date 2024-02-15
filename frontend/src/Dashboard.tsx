import React from "react";
import "./App.css"
import Navbar from "./components/ui/Navbar";
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
import { useState, useEffect } from "react";

export default function Dashboard() {
	const [isSmall, setisSmall] = useState(false);
	window.addEventListener("resize", (_) => {
		setisSmall(window.innerWidth <= 1000);
	})
	useEffect(() => {
		setisSmall(window.innerWidth <= 1000);
	}, [])
	return (
		<div className="h-screen parent">
			<Navbar />
			<div className="p-4 pt-6 h-5/6">
				<h1 className="text-4xl">Good Morning, Vikas</h1>
				<div className={isSmall ? "pt-6 gap-4 header-cards" : "pt-6 gap-4 header-cards flex h-full"}>
					<Card className={isSmall ? "p-4 mt-2 drop-shadow-xl info-card max-h-1/2" : "drop-shadow-xl w-screen p-4 info-card"}>
						<CardTitle>Components Available</CardTitle>
						<CardDescription className="mt-2">Number of components available at the Tinkering Lab right now.</CardDescription>
						<span className="text-4xl">45/</span><span>70</span>
						<div className={isSmall ? "hidden" : "h-4/5 overflow-y-scroll"}>
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
									<TableRow>
										<TableCell>Nut</TableCell>
										<TableCell>78</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Pliers</TableCell>
										<TableCell>87</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Arduino</TableCell>
										<TableCell>42</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Breadboard</TableCell>
										<TableCell>15</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Wire Cutter</TableCell>
										<TableCell>63</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Resistor</TableCell>
										<TableCell>29</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Screwdriver</TableCell>
										<TableCell>51</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Capacitor</TableCell>
										<TableCell>78</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>LED</TableCell>
										<TableCell>12</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Arduino</TableCell>
										<TableCell>37</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Breadboard</TableCell>
										<TableCell>94</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Wire Cutter</TableCell>
										<TableCell>53</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Pliers</TableCell>
										<TableCell>88</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Resistor</TableCell>
										<TableCell>66</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Arduino</TableCell>
										<TableCell>11</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Soldering Iron</TableCell>
										<TableCell>6</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Resistor</TableCell>
										<TableCell>80</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Capacitor</TableCell>
										<TableCell>41</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Arduino</TableCell>
										<TableCell>32</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Wire Cutter</TableCell>
										<TableCell>19</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Arduino</TableCell>
										<TableCell>2</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Pliers</TableCell>
										<TableCell>50</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Wire Cutter</TableCell>
										<TableCell>95</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Screwdriver</TableCell>
										<TableCell>66</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Breadboard</TableCell>
										<TableCell>92</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Soldering Iron</TableCell>
										<TableCell>56</TableCell>
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
