import { Bolt, ChevronFirst, ChevronLast, Dumbbell, Layers2 } from "lucide-react"
import React, { useState, useEffect } from "react"
import mainLogo from "./tinker.png"
import { NavigationMenu, NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Cog } from "lucide-react";
import { Button } from "./button";
import { Package } from "lucide-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { deleteTokenFromStorage } from "@/utils";
import { useToast } from "@/components/ui/use-toast"

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isSmall, setisSmall] = useState(false);
  const navigate = useNavigate()
  const { toast } = useToast();

  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  })

  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, [])



  if (!isSmall) {
    return <>
      <aside className={`${expanded ? "w-[200px]" : "w-16"} transition-all h-screen`}>
        <NavigationMenu className="h-full flex flex-col gap-5 info-card">
          <NavigationMenuItem className="p-4 pb-2 flex justify-between items-center mb-3">
            <div>
              <img
                src={mainLogo}
                className={`overflow-hidden transition-all ${expanded ? "w-10 h-10" : "w-0"
                  }`}
                alt=""
              />
            </div>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </NavigationMenuItem>
          <NavigationMenuItem className={`${expanded ? "" : "hidden"} list-none flex flex-col`}>

            <Link to="/admin/dashboard" className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg">
              <Home className="ml-2" />
              <span>Home</span>
            </Link>

            <Link to="/admin/dashboard/machine" className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg">
              <Cog className="ml-2" />
              <span>Machine</span>
            </Link>

            <Link to="/admin/dashboard/workstation" className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg">
              <Dumbbell className="ml-2" />
              <span>Workstation</span>
            </Link>

            <Link to="/admin/dashboard/component" className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg">
              <Bolt className="ml-2" />
              <span>Component</span>
            </Link>

            <Link to="/admin/dashboard/inventory" className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg">
              <Package className="ml-2" />
              <span>Inventory</span>
            </Link>

            <Link to="/admin/dashboard/allreqs" className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg">
              <Layers2 className="ml-2" />
              <span>Requests</span>
            </Link>
            <Button className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg" onClick={() => {
              deleteTokenFromStorage();
              navigate("/login");
              toast({
                title: "Logged out",
                variant: "success"
              })
            }}>Logout</Button>
          </NavigationMenuItem>
        </NavigationMenu>
      </aside>
    </>
  }
  else {
    return <>
      <div className={"flex flex-col gap-3 border-b-2  border-zinc-400 content-normal bg-zinc-200 navbar justify-between"}>
        <div className={"flex justify-between"}>
          <Link to="/dashboard" className="p-3 hover:rounded-lg flex">
            <img className="w-[45px] h-[45px]" src={mainLogo}></img>
            <h3 className="flex items-center px-1 font-bold">TINKERERS' LAB</h3>
          </Link>
          <Button variant="ghost" className={!isSmall ? "hidden" : ""} onClick={() => setHidden(!hidden)}><GiHamburgerMenu /></Button>
        </div>

        <div className={`${"flex flex-col" + (hidden ? " hidden" : "")}`}>
          <Link to="/admin/dashboard" className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg"><span>Home</span></Link>
          <Link to="/admin/dashboard/machine" className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg"> <span>Machine</span></Link>
          <Link to="/admin/dashboard/workstation" className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg"><span>Workstation</span></Link>
          <Link to="/admin/dashboard/component" className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg"> <span>Component</span></Link>
          <Link to="/admin/dashboard/inventory" className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg"> <span>Inventory</span></Link>
          <Button className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg" onClick={() => {
              deleteTokenFromStorage();
              navigate("/login");
              toast({
                title: "Logged out",
                variant: "success"
              })
            }}>Logout</Button>
        </div>
      </div>
    </>
  }



}