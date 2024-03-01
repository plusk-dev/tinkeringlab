import  React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from './Navbar';
import { Person } from './person';
import { useEffect} from 'react';
import { useState } from 'react';
import './LandingPage.css';

import { About } from './Tabs';
import { Members } from './Members';




export function LandingPage(){

  const [isSmall, setisSmall] = useState(false);
	window.addEventListener("resize", (_) => {
		setisSmall(window.innerWidth <= 1000);
	})
	useEffect(() => {
		setisSmall(window.innerWidth <= 1000);
	}, [])

  useEffect(()=>{
    AOS.init({
      once:true
    })
  },[])

  return (<>
    <Navbar />

    <div className="land">
        <div  className="h-screen flex">
          <div className="pl-5 w-1/2 font-bold text-6xl flex-grow flex items-center justify-center">
            <h1 className="text-center bg-gradient-to-r from-blue-700 via-[#528efd] to-blue-700 inline-block text-transparent bg-clip-text">Welcome to the official page of Tinkerers' Lab,<br></br><span className="text-[#003f87]">IIT Jammu</span></h1>
          </div>
        </div>

      <About/>
      <Members/>
      




    </div>
  
 
  </>);
}

