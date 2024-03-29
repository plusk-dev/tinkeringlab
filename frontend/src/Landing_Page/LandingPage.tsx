import  React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from './Navbar';
import { useEffect} from 'react';
import { useState } from 'react';
import './LandingPage.css';
import Events from './Events';
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
 

        <div className='overflow-x-hidden scrollbar'>
          <div  className=" overflow-y-hidden h-screen flex bg-no-repeat bg-cover w-full" style={{backgroundImage:'url("src/images/image.webp")'}}>
            <Navbar />
          </div>
          <h1 className=' px-4 font-bold flex justify-center text-center text-[50px] bg-transparent relative top-[-600px] lg:top-[-500px] h-8 text-white'>Welcome to the official page of Tinkerer's Lab<br/> IIT Jammu</h1>
          
          <About/>

          <Events/>

          <Members/>

        </div>

 
  </>);
}

