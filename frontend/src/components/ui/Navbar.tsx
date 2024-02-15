import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
	const [isSmall, setisSmall] = useState(false);
	const [hidden, setHidden] = useState(true);
	window.addEventListener("resize", (_) => {
		setisSmall(window.innerWidth <= 1000);
	})
	useEffect(() => {
		setisSmall(window.innerWidth <= 1000);
	}, [])
	return <>
		<div className={isSmall ? "flex flex-col gap-3 border-b-2  border-zinc-400 content-normal bg-zinc-200 navbar" : "flex gap-3 border-b-2  border-zinc-400 content-normal bg-zinc-200 navbar"}>
			<div className="flex justify-between">
				<Link to="/dashboard" className="p-3 hover:rounded-lg">
					Tinkering Lab Logo here
				</Link>
				<Button variant="ghost" className={!isSmall ? "hidden" : ""} onClick={() => setHidden(!hidden)}><GiHamburgerMenu /></Button>
			</div>
			<div className={isSmall ? "flex-col flex hidden" + (!hidden ? "hidden" : "") : "flex"}>
				<Link to="/login" className="p-3 hover:bg-zinc-300 hover:rounded-lg">My Bookings</Link>
				<Link to="/dashboard/booking" className="p-3 hover:bg-zinc-300 hover:rounded-lg">New Booking</Link>
				<Link to="/login" className="p-3 hover:bg-zinc-300 hover:rounded-lg">Inventory</Link>
			</div>
		</div>
	</>
}