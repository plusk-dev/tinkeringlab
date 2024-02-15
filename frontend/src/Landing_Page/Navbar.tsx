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
  <header className={`sticky border-b-[1px] border-t-[1px] border-black top-0 w-full bg-white" transition-transform transform ${scrolling ? '-translate-y-full' : ''}`}>    
    <NavigationMenu className="max-w-none">
      <NavigationMenuList className="container h-14 px-2 w-screen flex justify-between">
        <NavigationMenuItem>
          <div>Tinkering Lab Logo</div>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button onClick={()=>{navigate("/login")}}>
            Login
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </header>
  </>
}