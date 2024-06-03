import React from "react";
import "../App.css";
import Navbar from "../components/ui/Navbar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import { useState, useEffect, useRef } from "react";
import {
  getTokenFromStorage,
  verify_token,
  deleteTokenFromStorage,
} from "@/utils";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import UserComponent from "./userSideCards/component";
import UserSession from "./userSideCards/session";
import UserWorkstation from "./userSideCards/workstation";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSmall, setisSmall] = useState(false);
  const authenticated = useRef(false);

  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  });
  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
    if (!authenticated.current) {
      verify_token(getTokenFromStorage()).catch((error) => {
        let toastMessage: String = "";
        toastMessage = error.response.data.error;
        toast({
          title: `${toastMessage}`,
          variant: "destructive",
        });
        navigate("/login");
        deleteTokenFromStorage();
      });
      authenticated.current = true;
    }
  }, []);

  return (
    <div className="h-screen parent">
      <Navbar />
      <div className="p-4 pt-4 h-5/6">
        <div className="flex">
          <Card className="w-full flex info-card">
            <div className="diamond-shape m-5 h-14 w-14"></div>
            <h1 className="text-3xl tracking-tight pl-2 font-medium flex items-center">
              Welcome! User
            </h1>
          </Card>
        </div>
        <div
          className={
            isSmall
              ? "gap-4 header-cards"
              : "pt-4 gap-4 header-cards flex h-full"
          }
        >
          <Card
            className={
              isSmall
                ? "p-4 mt-2 drop-shadow-xl info-card max-h-1/2"
                : "drop-shadow-xl w-screen p-4 info-card"
            }
          >
            <CardTitle>Components Available</CardTitle>
            <CardDescription className="mt-2">
              Number of components available at the Tinkering Lab right now.
            </CardDescription>
            <UserComponent />
          </Card>
          <Card
            className={
              isSmall
                ? "p-4 mt-2 drop-shadow-xl info-card"
                : "drop-shadow-xl w-screen p-4 info-card"
            }
          >
            <CardTitle>Workstations Available</CardTitle>
            <CardDescription className="mt-2">
              Number of workstations available at the Tinkering Lab right now.
            </CardDescription>
            <UserWorkstation />
          </Card>
          <Card
            className={
              isSmall
                ? "p-4 mt-2 drop-shadow-xl info-card"
                : "drop-shadow-xl w-screen p-4 info-card"
            }
          >
            <CardTitle>Sessions</CardTitle>
            <CardDescription>Sessions at the tinkerer's lab</CardDescription>

            <UserSession />
          </Card>
        </div>
      </div>
    </div>
  );
}
