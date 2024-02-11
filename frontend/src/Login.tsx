import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import * as React from 'react';
import { Button } from "@/components/ui/button";
import logo from './assets/logo.svg'
import { useToast } from "@/components/ui/use-toast"
import getUrl from "./utils";
import { redirect } from "react-router-dom";


export default function Login() {
  const { toast } = useToast();
  return <>
    <div className="flex h-screen flex-col">
      <div className="h-1/2 bg-zinc-950 text-center m-auto">
        <img src={logo} className="h-1/2 w-screen mt-32" />
        <h1 className="text-4xl">Login</h1>
      </div>
      <div className="flex h-1/2 justify-center bg-zinc-950" >
        <div className="flex flex-col text-center pt-4">
          <GoogleLogin
            onSuccess={credentialResponse => {
              if (credentialResponse.credential) {
                const details: any = jwtDecode(credentialResponse.credential);
                let info: string[] = details.email.split('@');
                if (info[1] === "iitjammu.ac.in") {
                  getUrl("/", {
                    name: "test"
                  }).then(data => {
                    console.log(data)
                  })
                  toast({
                    title: "Login Successful",
                    variant: "success"
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