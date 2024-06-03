import React from "react";
import { createContext } from "react";
import Component from "./adminCards/component";
import Sidebar from "@/components/ui/Sidebar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import ReqHandler from "../requests/mainPage/page";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  getTokenFromStorage,
  verify_admin_token,
  deleteTokenFromStorage,
  getUrl,
} from "@/utils";
import Session from "./adminCards/session";
import Workstation from "./adminCards/workstation";
import UserComponent from "./userSideCards/component";

export const compContext = createContext([] as any[]);

export default function AdminDashboard() {
  const [mainData, setMainData] = useState<any>({ labels: [], datasets: [] });
  const [mainDatathisMo, setMainDatathisMo] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [compsTotal, setCompsTotal] = useState([]); //this is the array of all components in the inventory
  const [isSmall, setisSmall] = useState(false);

  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  });

  useEffect(() => {
    getUrl("/inventory/components/all", {}).then((response) => {
      let data = response.data.components;
      setCompsTotal(data);
    });
  }, []);

  useEffect(() => {
    getUrl("/requests/all", {}).then((response) => {
      const data = JSON.parse(response.data);
      let components: number = 0;
      let compthismo: number = 0;
      let sessions: number = 0;
      let sessionsthismo: number = 0;
      let workstations: number = 0;
      let workstationsthismo: number = 0;

      data.map((item: any) => {
        if (item.type === "component") {
          components++;
          if (new Date(item.created_at).getMonth() === new Date().getMonth()) {
            compthismo++;
          }
        } else if (item.type === "session") {
          sessions++;
          if (new Date(item.created_at).getMonth() === new Date().getMonth()) {
            sessionsthismo++;
          }
        } else {
          workstations++;
          if (new Date(item.created_at).getMonth() === new Date().getMonth()) {
            workstationsthismo++;
          }
        }
      });

      const doughnutData = {
        labels: ["Component", "Session", "Workstation"],
        datasets: [
          {
            label: "# of Votes",
            data: [components, sessions, workstations],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(252, 186, 3, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(252, 186, 3, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const doughnutDatathisMo = {
        labels: ["Component", "Session", "Workstation"],
        datasets: [
          {
            label: "# of Votes",
            data: [compthismo, sessionsthismo, workstationsthismo],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(252, 186, 3, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(252, 186, 3, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      setMainData(doughnutData);
      setMainDatathisMo(doughnutDatathisMo);
    });
  }, []);

  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, []);
  const { toast } = useToast();
  const navigate = useNavigate();
  const authenticated = useRef(false);

  useEffect(() => {
    if (!authenticated.current) {
      verify_admin_token(getTokenFromStorage())
        .then((response) => {
          if (response.data.admin != true) {
            toast({
              title: "You are not an admin",
              variant: "destructive",
            });
            navigate("/login");
            deleteTokenFromStorage();
          }
        })
        .catch((error) => {
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

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <>
      <compContext.Provider value={compsTotal}>
        <div
          className={`hover:rounded-lg ${isSmall ? "" : "flex"} max-h-screen`}
        >
          <Sidebar />
          <div
            className="flex flex-col w-screen ps-1 pe-1 overflow-auto"
            style={{ maxHeight: "98vh" }}
          >
            <div className="flex m-1">
              <Card className="w-full flex info-card">
                <div className="diamond-shape m-5 h-14 w-14"></div>
                <h1 className="text-3xl tracking-tight pl-2 font-medium flex items-center">
                  Welcome! User
                </h1>
              </Card>
            </div>

            <div className={isSmall ? "" : "flex-1 flex h-full mb-1"}>
              <ReqHandler />
              <Card className="info-card m-1 flex-1 p-1 ">
                <div
                  className={
                    isSmall ? "" : "flex flex-col overflow-y-scroll h-5/6"
                  }
                >
                  <div className="flex-1 flex flex-col gap-1">
                    <CardTitle>Request success rate</CardTitle>
                    <div className="flex flex-col md:flex-row">
                      <Card className="flex-1 m-1 p-4 info-card">
                        <CardTitle className="text-xl">This Month</CardTitle>
                        <Doughnut data={mainDatathisMo} />
                      </Card>
                      <Card className="flex-1 m-1 p-4 info-card">
                        <CardTitle className="text-xl">All Time</CardTitle>
                        <Doughnut data={mainData} />
                      </Card>
                    </div>

                    <CardTitle>Components</CardTitle>
                    <Component></Component>

                    <CardTitle>Sessions</CardTitle>
                    <Session></Session>

                    <CardTitle>Workstations</CardTitle>
                    <Workstation></Workstation>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </compContext.Provider>
    </>
  );
}
