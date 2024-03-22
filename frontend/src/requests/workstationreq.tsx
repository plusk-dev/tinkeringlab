import Sidebar from "@/components/ui/Sidebar";
import { Card, CardTitle } from "@/components/ui/card";
import React, { useEffect,useState} from "react";


export default function WorkMech(){

  const [isSmall, setisSmall] = useState(false);
  
  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  })
  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, [])

  return <>
      <div className={`hover:rounded-lg ${isSmall ? "" : "flex"} h-screen`}>
        <Sidebar></Sidebar>
        <div className={`flex gap-1 w-screen ${isSmall?"flex-col":""}`}>
          <Card className="flex-1 info-card ml-1">
            <CardTitle>Requests</CardTitle>
          </Card>
          <Card className="flex-1 info-card ">
            <CardTitle>Overdue</CardTitle>
          </Card>
        </div>
      </div>

  </>
}