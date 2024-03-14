import Sidebar from "@/components/ui/Sidebar";
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
      <div className={`hover:rounded-lg ${isSmall ? "" : "flex"} max-h-screen`}>
        <Sidebar />
        
      </div>

  </>
}