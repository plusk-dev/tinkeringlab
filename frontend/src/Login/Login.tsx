import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import * as React from 'react';
import { Button } from "@/components/ui/button";
import logo from './assets/logo.svg'
import { useToast } from "@/components/ui/use-toast"
import { getTokenFromStorage, getUrl, postUrl, setToken } from "../utils";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";


export default function Login() {
  const { toast } = useToast();
  const [redirect, setRedirect] = useState(false);
  const [level, setLevel] = useState("");
  useEffect(() => {
    if (getTokenFromStorage() != null) {
      getUrl("/get_level", {
        email: ""
      }).then(response => {
        if (response.data.level == "admin") {
          setLevel("/admin/dashboard")
        } else {
          setLevel("/dashboard");
        }
        setRedirect(true);
      })
    }
  })
  if (!redirect) {
    return <>
      <div className="flex h-screen flex-col">
        <div className="h-1/2 bg-zinc-950 text-center m-auto">
          <img src={logo} className="h-1/2 w-screen mt-28" />
          <h1 className="text-4xl">Sign In</h1>
        </div>
        <div className="flex h-1/2 justify-center bg-zinc-950" >
          <div className="flex flex-col text-center pt-4">
            <GoogleLogin
              onSuccess={credentialResponse => {
                if (credentialResponse.credential) {
                  const details: any = jwtDecode(credentialResponse.credential);
                  let info: string[] = details.email.split('@');
                  if (info[1] === "iitjammu.ac.in") {
                    getUrl("/get_level", {
                      email: details.email
                    }).then(response => {
                      let userDetails = response.data;
                      postUrl("/get_new_token", {
                        email: details.email
                      }).then(response => {
                        console.log(response.data);
                        if (response.status == 400) {
                          toast({
                            title: "Invalid Email Provided",
                            variant: "destructive"
                          })
                        } else {
                          setToken(response.data.token);
                          toast({
                            title: "Login Successful",
                            variant: "success"
                          })
                          setRedirect(true);
                          if (userDetails.level == "admin") {
                            setLevel("/admin/dashboard");
                          } else if (userDetails.level == "user") {
                            setLevel("/dashboard");
                          }
                        }
                      })
                    })
                  }
                  else {
                    toast({
                      title: "Login Unsuccessful",
                      description: "Login requires an IIT Jammu Email.",
                      variant: "destructive"
                    })
                  }
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <Button className="mt-3">View as guest</Button>
          </div>
        </div>
      </div>
    </>

  }
  return (
    <Navigate replace to={level} />
  )
}