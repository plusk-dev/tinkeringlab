import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import {useEffect} from "react";
import mainLogo from '../images/tinker.png'
import { View } from "lucide-react";

export function Navbar(){
  const navigate=useNavigate();
  

    const [scrolling, setScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        setScrollTop(window.scrollY);
        setScrolling(window.scrollY > scrollTop);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [scrollTop]);
  

  return <>
  <header className={`sticky bg-[] border-black top-0 w-full bg-white" transition-transform transform ${scrolling ? '-translate-y-full' : ''}`}>    
    <NavigationMenu className="max-w-none">
      <NavigationMenuList className="h-14 px-2 w-screen flex justify-between">
        <NavigationMenuItem className="flex ml-3">
          <img src={mainLogo} className="w-[45px] h-[45px]"></img>
          <div className="flex items-center px-1 font-bold font-white">TINKERERS' LAB</div>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button className="mr-5 bg-[#003f87]"onClick={()=>{navigate("/login")}}>
            Login
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </header>
  </>
}