import React, { useState, useRef, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import Req from "./Req";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../components/ui/select";
import saaman from "./testData";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Input } from "@/components/ui/input"

interface Data {
  name: string;
  type: string;
  id: string;
}

export default function ReqHandler() {
  const [resultArray, setResultArray] = useState(saaman);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [items, setItems] = useState(saaman.slice(0, 10)); // Load initial items
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


  const fetchMoreData = () => {
    if (items.length >= saaman.length) {
      setHasMore(false);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setItems(prevItems => prevItems.concat(saaman.slice(prevItems.length, prevItems.length + 10)));
      setLoading(false);
    }, 500);
  };

  const handleChange = (value: string) => {

    const filteredArray = saaman.filter((item) => item.type === value || value === "None");
    setResultArray(filteredArray);
    setItems(filteredArray.slice(0, 10)); // Reset items to the first page of filtered data
    setHasMore(filteredArray.length > 10); // Update hasMore based on filtered data length
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      let newArray = saaman.filter(
        (item) => item.name.toLowerCase().includes(newSearchQuery.toLowerCase())
      );
      setResultArray(newArray);
      setItems(newArray.slice(0, 10)); // Reset items to the first page of filtered data
      setHasMore(newArray.length > 10); // Update hasMore based on filtered data length
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
        </div>
        <InfiniteScroll
          className="mt-2"
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore && !loading}
          loader={<h4>Loading...</h4>}
          height={window.innerHeight*0.8}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {items.map((item) => (
            <Req key={item.id} {...item} />
          ))}
        </InfiniteScroll>
      </Card>
    </>
  );
}
