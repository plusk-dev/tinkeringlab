import React, { useState, useRef, useEffect } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Req from "./Req";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../components/ui/select";
import saaman from "./testData";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface Data {
  name: string;
  type: string;
  id: string;
  status: string
  desc: string
  expiryDate: Date
}


export default function ReqHandler() {
  const [mainData, setMaindata] = useState<Data[]>(saaman)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [items, setItems] = useState(mainData.slice(0, 10)); // Load initial items
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const [isSmall, setisSmall] = useState(false);
  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  })
  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, [])

  const updateStatus = (requestId: string, newStatus: string) => {
    const updatedData = items.map(req => {
      if (req.id === requestId) {
        return { ...req, status: newStatus };
      }
      return req;
    });
    setItems(updatedData);
  };

  const fetchMoreData = () => {
    if (items.length >= mainData.length) {
      setHasMore(false);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setItems(prevItems => prevItems.concat(mainData.slice(prevItems.length, prevItems.length + 10)));
      setLoading(false);
    }, 500);
  };

  const handleChange = (value: string) => {

    const filteredArray = mainData.filter((item) => item.type === value || value === "None");

    setItems(filteredArray.slice(0, 10));
    setHasMore(filteredArray.length > 10);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      let newArray = mainData.filter(
        (item) => item.name.toLowerCase().includes(newSearchQuery.toLowerCase())
      );

      setItems(newArray.slice(0, 10));
      setHasMore(newArray.length > 10);
    }, 100); // Debounce time
  };

  return (
    <>

      <Card className={isSmall ? "hidden" : "info-card m-1 mb-0 flex-1 p-4"}>
        <div className="flex justify-between">

          <CardTitle className="p-1">Requests</CardTitle>
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded mx-2 flex-1"
          />

          <div>
            <Select onValueChange={handleChange}>
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
          <Button onClick={() => {
              setItems(
                items.concat(
                  mainData.slice(items.length, items.length + 10)
                )
              )
            }} className="bg-transparent hover:bg-zinc-300"><ArrowUpDown /></Button>
        </div>
        <InfiniteScroll
          className="mt-2"
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore && !loading}
          loader={<h4>Loading...</h4>}
          height={window.innerHeight * 0.8}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {items.map((item) => {
            if (item.status === "unresolved")
              return <Req key={item.id} data={item} updateStatus={updateStatus} />
          })}
        </InfiniteScroll>
      </Card>
    </>
  );
}
