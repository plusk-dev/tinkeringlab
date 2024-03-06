import { ChevronFirst, ChevronLast } from "lucide-react"
import React, { useState,useEffect } from "react"
import mainLogo from "./tinker.png"
import { NavigationMenu, NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function Sidebar(){
  const [expanded, setExpanded] = useState(true);

  const [isSmall, setisSmall] = useState(false);
	window.addEventListener("resize", (_) => {
		setisSmall(window.innerWidth <= 1000);
	})

	useEffect(() => {
		setisSmall(window.innerWidth <= 1000);
	}, [])	


  
  if(!isSmall){
    return <>
      <aside className={`${expanded?"w-[200px]":"w-16"} transition-all h-screen`}>
        <NavigationMenu className="h-full flex flex-col gap-5 info-card">
          <NavigationMenuItem className="p-4 pb-2 flex justify-between items-center mb-3">
              <div>
                <img
                  src={mainLogo}
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-10 h-10" : "w-0"
                  }`}
                  alt=""
                />
              </div>
              <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
              {expanded ? <ChevronFirst/> : <ChevronLast/>}
            </button>
          </NavigationMenuItem>
          <NavigationMenuItem className={`${expanded?"":"hidden"} list-none flex flex-col`}>
           
            <Link to="/admin/dashboard"  className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg">
              <Home className="ml-2"/>
              <span>Home</span>
            </Link>
           
          </NavigationMenuItem>
        </NavigationMenu>
      </aside>
    </>
  }
  else{
    return <>
      hello
    </>
  }
      
    
  
}