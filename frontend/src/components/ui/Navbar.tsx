import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { GiHamburgerMenu } from "react-icons/gi";
import tink from "./tinker.png";
import { deleteTokenFromStorage } from "@/utils";
import { useToast } from "./use-toast";

export default function Navbar() {
  const [isSmall, setisSmall] = useState(false);
  const [hidden, setHidden] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  });
  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, []);
  return (
    <>
      <div
        className={
          isSmall
            ? "flex flex-col gap-3 border-b-2  border-zinc-400 content-normal bg-zinc-200 navbar justify-between"
            : "flex  justify-between gap-3 border-b-2  border-zinc-400 content-normal bg-zinc-200 navbar"
        }
      >
        <div className={isSmall ? "flex justify-between" : "flex"}>
          <Link to="/dashboard" className="p-3 hover:rounded-lg flex">
            <img className="w-[45px] h-[45px]" src={tink}></img>
            <h3 className="flex items-center px-1 font-bold">TINKERERS' LAB</h3>
          </Link>
          <Button
            variant="ghost"
            className={!isSmall ? "hidden" : ""}
            onClick={() => setHidden(!hidden)}
          >
            <GiHamburgerMenu />
          </Button>
        </div>
        <div
          className={`${
            isSmall
              ? "flex flex-col" + (hidden ? " hidden" : "")
              : "flex items-center justify-end"
          }`}
        >
          <Link
            to="/dashboard/myBookings"
            className="p-3 hover:bg-zinc-300 hover:rounded-lg"
          >
            My Bookings
          </Link>
          <Link
            to="/dashboard/machine"
            className="p-3 hover:bg-zinc-300 hover:rounded-lg"
          >
            Book a training session
          </Link>
          <Link
            to="/dashboard/booking"
            className="p-3 hover:bg-zinc-300 hover:rounded-lg"
          >
            Issue a component
          </Link>
          <Link
            to="/dashboard/workstation"
            className="p-3 hover:bg-zinc-300 hover:rounded-lg"
          >
            Book a workstation
          </Link>
          <Button
            className="p-3 flex gap-2 hover:bg-zinc-300 hover:rounded-lg"
            onClick={() => {
              deleteTokenFromStorage();
              navigate("/login");
              toast({
                title: "Logged out",
                variant: "success",
              });
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
