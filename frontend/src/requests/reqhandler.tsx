import React, { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import Req from "./Req";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../components/ui/select";
import data from "./testData";


export default function ReqHandler() {
  const [isSmall, setisSmall] = useState(false);
  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  });
  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, []);



  const [resultArray, setResultArray] = useState([...data]);
  const [selectedType, setSelectedType] = useState(""); 
  const [searchQuery, setSearchQuery] = useState<string>('');



  const handleChange = (value:string) => {
    if(value==="None"){
      setSelectedType(value);
      setResultArray(data);
      return
    }
    setSelectedType(value);

  
    const filteredArray = data.filter((item) => item.type === value);
    setResultArray(filteredArray);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
  
    const newArray = data.filter(
      (item) => item.name.toLowerCase().includes(newSearchQuery.toLowerCase())
    );
    setResultArray(newArray);
  };
  



  return (
    <>
      <Card className="h-[675px] info-card m-1 mb-0 flex-1 p-4 overflow-y-scroll ">
        <div className="flex justify-between">
          <CardTitle className="p-1">Requests</CardTitle>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded mx-2 flex-1"
          />
          <div>
            <Select value={selectedType} onValueChange={handleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Machine">Machine</SelectItem>
                  <SelectItem value="Component">Component</SelectItem>
                  <SelectItem value="Workstation">Workstation</SelectItem>
                  <SelectItem value="None">None</SelectItem>
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
  );
}
