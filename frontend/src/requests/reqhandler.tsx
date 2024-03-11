import React from "react";
import { Card,CardTitle } from "@/components/ui/card";
import { useState,useEffect } from "react";
import Req from "./Req";
import { Select,SelectTrigger,SelectValue,SelectContent,SelectGroup,SelectItem } from "../components/ui/select";
import data from "./testData";



export default function ReqHandler(){
  const [isSmall, setisSmall] = useState(false);
	window.addEventListener("resize", (_) => {
		setisSmall(window.innerWidth <= 1000);
	})
	useEffect(() => {
		setisSmall(window.innerWidth <= 1000);
	}, [])

  const [resultArray,setResultArray]=useState([...data])

  const handleChange=()=>{
    
  }


  return <>
    <Card className="min-h-full info-card m-1 flex-1 p-4">

      <div className="flex justify-between">
        <CardTitle className="p-1">
          Requests
        </CardTitle>
        <div >
          <Select> 
              <SelectTrigger onChange={handleChange}>
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="3dp">Machine</SelectItem>
                  <SelectItem value="megatron">Component</SelectItem>
                  <SelectItem value="compuper">Workstation</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>
      </div>
  
      <div className="flex flex-col mt-3 gap-1">
        {resultArray.map((item) => (
          <Req key={item.id} {...item} />
        ))}
      </div>

      
      
    </Card>
  </>
}