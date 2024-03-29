import Sidebar from "@/components/ui/Sidebar";
import { Card, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState, useRef } from "react";
import saaman from "./testData";
import Req from "./Req";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";
import { getTokenFromStorage, verify_admin_token, deleteTokenFromStorage } from "@/utils"

interface Data {
  name: string;
  type: string;
  id: string;
  status: string
  description: string
  expiryDate: Date
}

export default function Reqcomp() {
  const [searchOver, setSearchOver] = useState<string>('');
  const [compArray, setCompArray] = useState<Data[]>(saaman.filter(item => item.type === "Machine"))
  const [pending, setPending] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSmall, setisSmall] = useState(false);
  const [items, setItems] = useState((compArray).slice(0, 10));
  const [itemsForOver, setItemsForOver] = useState((compArray).slice(0, 10));
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const [overdueItems, setOverdueItems] = useState<Data[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate()
  const authenticated = useRef(false);

  useEffect(() => {
    if (!authenticated.current) {
      verify_admin_token(getTokenFromStorage()).then(response => {
        if (response.data.admin != true) {
          toast({
            title: "You are not an admin",
            variant: "destructive"
          })
          navigate("/login");
          deleteTokenFromStorage();
        }
      }).catch(error => {
        let toastMessage: String = "";
        toastMessage = error.response.data.error;
        toast({
          title: `${toastMessage}`,
          variant: "destructive"
        })
        navigate("/login");
        deleteTokenFromStorage();
      })
      authenticated.current = true;
    }
  }, [])
  useEffect(() => {
    const beebop = saaman.filter(item => item.type === "Machine");
    setCompArray(beebop);
    const overdue = compArray.filter((request) => request.expiryDate < new Date());
    setOverdueItems(overdue);
  }, [saaman]);



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

    if (items.length >= compArray.length) {
      setHasMore(false);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setItems((prevItems) =>
        prevItems.concat(
          compArray.slice(prevItems.length, prevItems.length + 10)
        )
      );
      setLoading(false);
    }, 500);
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      let newArray = compArray.filter(
        (item) => item.name.toLowerCase().includes(newSearchQuery.toLowerCase())
      );

      setItems(newArray.slice(0, 10));
      setHasMore(newArray.length > 10);
    }, 100); // Debounce time
  };

  const handleOverSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchOver = event.target.value;
    setSearchOver(searchOver);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      let newArray = compArray.filter(
        (item) => item.name.toLowerCase().includes(searchOver.toLowerCase())
      );

      setItemsForOver(newArray.slice(0, 10));
      setHasMore(newArray.length > 10);
    }, 100); // Debounce time
  };



  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  })
  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, [])

  return <>
    <div className={`hover:rounded-lg ${isSmall ? "" : "flex"} h-screen`}>
      <Sidebar></Sidebar>
      <div className={`flex gap-1 w-screen ${isSmall ? "flex-col" : ""}`}>

        <Card className=" flex flex-col flex-1 info-card ml-1 mt-1">

          <div className="flex gap-8 items-center m-2">
            <CardTitle className="flex-1">{pending ? <span>Pending Requests</span> : <span>Active Requests</span>}</CardTitle>
            <Switch className=" shadow-md shadow-slate-300" onClick={() => { setPending(!pending); }} />
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={isSmall ? "border-gray-300 rounded mx-2 w-full" : "hidden"}
            />
          </div>


          <InfiniteScroll
            className="mt-2"
            dataLength={compArray.length}
            next={fetchMoreData}
            hasMore={hasMore && !loading}
            loader={<h4></h4>}
            height={window.innerHeight * 0.8}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >

            {

              (
                items.map((item) => {

                  if (pending && item.status === "unresolved" && item.expiryDate > new Date())
                    return <Req key={item.id} data={item} updateStatus={updateStatus}></Req>
                  else if (!pending && item.status === "resolved" && item.expiryDate > new Date()) {
                    return <Req key={item.id} data={item} updateStatus={updateStatus}></Req>
                  }
                })

              )


            }


          </InfiniteScroll>




          <div className="flex flex-1 items-center justify-center w-full">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={!isSmall ? "border-gray-300 rounded mx-2 w-full" : "hidden"}
            />
            <Button onClick={() => {
              setItems(
                items.concat(
                  compArray.slice(items.length, items.length + 10)
                )
              )
            }} className="bg-transparent hover:bg-zinc-300"><ArrowUpDown /></Button>
          </div>

        </Card>




        <Card className=" flex flex-col flex-1 info-card ml-1 mt-1">
          <CardTitle className="m-2">Overdue</CardTitle>
          <InfiniteScroll
            className="mt-2"
            dataLength={overdueItems.length}
            next={fetchMoreData}
            hasMore={hasMore && !loading}
            loader={<h4></h4>}
            height={window.innerHeight * 0.8}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >

            {

              itemsForOver.map((item) => {
                if (item.expiryDate < new Date())
                  return <Req key={item.id} data={item} updateStatus={updateStatus}></Req>

              }
              )

            }


          </InfiniteScroll>




          <div className="flex flex-1 items-center justify-center w-full">
            <Input
              type="search"
              placeholder="Search..."
              value={searchOver}
              onChange={handleOverSearchChange}
              className={!isSmall ? "border-gray-300 rounded mx-2 w-full" : "hidden"}
            />
            <Button onClick={() => {
              setItems(
                items.concat(
                  compArray.slice(items.length, items.length + 10)
                )
              )
            }} className="bg-transparent hover:bg-zinc-300"><ArrowUpDown /></Button>
          </div>
        </Card>
      </div>
    </div>

  </>
}