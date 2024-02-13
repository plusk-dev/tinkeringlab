import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export function Navbar(){
  const navigate=useNavigate();
  return <>
  <header className="sticky border-b-[1px] top-0 w-full bg-zinc-800">    
    <NavigationMenu className="max-w-none">
      <NavigationMenuList className="container h-14 px-2 w-screen flex justify-between">
        <NavigationMenuItem>
          <div>logo</div>
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