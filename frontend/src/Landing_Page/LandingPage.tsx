import  React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from './Navbar';
import { Person } from './person';
import { useEffect} from 'react';
import { useState } from 'react';
import './LandingPage.css';
import RISHIKA from '../images/RISHIKA.jpg'
import nivedita from '../images/nivedita.jpg'
import SAhil from '../images/SAhil.jpg'
import ATHARVA from '../images/ATHARVA.png'
import Tanisha from '../images/Tanisha.jpg'
import khushboo from '../images/khushboo.jpg'
import Shaurya_gupta from '../images/Shaurya_gupta.jpg'



let url = "../images/Ind_img/RISHIKA.png"
const sentence=["Welcome", "to", "the", "official", "page", "of","Tinkerers' Lab," ,"IIT", "Jammu"];
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
    })
  },[])

  return (<>
    <Navbar />

    <div className="land">

        
        <div  className="h-screen flex">
          <div className="pl-5 w-1/2 font-bold text-6xl flex-grow flex items-center justify-center">
            <h1 className="text-center bg-gradient-to-r from-blue-700 via-[#528efd] to-blue-700 inline-block text-transparent bg-clip-text">Welcome to the official page of Tinkerers' Lab,<p className="text-[#003f87]">IIT Jammu</p></h1>
          </div>
        </div>
        
        <div data-aos="fade-up" data-aos-delay="100" className="flex-col">
          <div className="flex">
            <div className="flex w-1/3 justify-center items-center bg-[]">
              <h3 className="font-bold text-3xl text-center bg-gradient-to-r from-blue-700 via-[#528efd] to-blue-700 inline-block text-transparent bg-clip-text"> WHO WE ARE</h3>
            </div>

            <div className="">
                <p className="text-center container pr-3">At Tinkerers Lab, we are a group of dedicated educators, engineers, and enthusiasts committed to fostering a culture of tinkering and experimentation. We believe that hands-on experiences are the key to unlocking the potential of every individual, regardless of age or background.</p> 
          </div>
        </div>
      </div>
      
      




      <div data-aos="fade-up" data-aos-delay="200" className="flex items-center mt-2">
        <div className="border-gray-500 border-[1px] flex-grow "></div>
        <div className="text-gray-500">Members</div>
        <div className="border-gray-500 border-[1px] flex-grow"></div>
      </div>

      <div data-aos="fade-up" data-aos-delay="400" className={isSmall? "cards":"cards flex flex-wrap container mx-auto"}>
          <Person image={RISHIKA} name={"Rishika"} post={"post"} />
          <Person image={nivedita} name={"Nivedita"} post={"post"} />
          <Person image={SAhil} name={"Sahil"} post={"post"} />
          <Person image={ATHARVA} name={"Atharva"} post={"post"} />
          <Person image={Tanisha} name={"Tanisha"} post={"post"} /> 
          <Person image={khushboo} name={"Khushboo"} post={"post"} />
          <Person image={Shaurya_gupta} name={"Shaurya"} post={"post"} />    
    </div>

    </div>
  
 
  </>);
}

