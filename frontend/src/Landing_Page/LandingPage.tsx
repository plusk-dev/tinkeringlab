import  React from 'react'
import { Navbar } from './Navbar';
import { Person } from './person';
import { useEffect} from 'react';
import { useState } from 'react';
import logo from "../assets/logo.svg"
import './LandingPage.css'


let url = "https://sciroi.net/wp-content/uploads/sites/2/2021/07/Manoj-Gaur-e1594428211836.png"
const sentence=["Welcome", "to", "the", "official", "page", "of","Tinkering Lab," ,"IIT", "Jammu"];
export function LandingPage(){

  const [isSmall, setisSmall] = useState(false);
	window.addEventListener("resize", (_) => {
		setisSmall(window.innerWidth <= 1000);
	})
	useEffect(() => {
		setisSmall(window.innerWidth <= 1000);
	}, [])

  return (<>
    <Navbar />

    <div className="land">
    <div className="h-screen flex">
      <div className="pl-5 font-bold w-1/2 h-screen text-6xl flex-grow flex items-center">
        <h1 >Welcome to the official page of Tinkering Lab,<p className="text-[#003f87]">IIT Jammu</p></h1>
      </div>

      <div className="flex-grow w-1/2 h-screen text-white">
        <img src={logo}></img>
      </div>
    </div>
      
  
    <div className={isSmall? "cards":"cards flex flex-wrap container mx-auto"}>
        <Person image={url} name={"Satvic Dhawan"} post={"post"} />
        <Person image={url} name={"Satvic Dhawan"} post={"post"} />
        <Person image={url} name={"Satvic Dhawan"} post={"post"} />
        <Person image={url} name={"Satvic Dhawan"} post={"post"} />
        <Person image={url} name={"Satvic Dhawan"} post={"post"} />0
        <Person image={url} name={"Satvic Dhawan"} post={"post"} />
        <Person image={url} name={"Satvic Dhawan"} post={"post"} />
        <Person image={url} name={"Satvic Dhawan"} post={"post"} />
        <Person image={url} name={"Satvic Dhawan"} post={"post"} />
    </div>

    </div>
  
 
  </>);
}

