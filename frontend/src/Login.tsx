import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import * as React from 'react';
import { Button } from "./components/ui/button";
import logo from './assets/logo.svg'
import { Toaster,toast } from "sonner"
import { LeafyGreen } from "lucide-react";



export default function Login() {
  return <>
  
  <div className="flex h-screen flex-col">

      <div className="flex justify-center items-end h-1/2 bg-zinc-800 text-center">
        <img src={logo} className="h-2/3"/>
      </div>
      <div className="flex h-1/2 justify-center  bg-zinc-800" >
       
        <div className="flex flex-col text-center pt-10">
        <Toaster/>  
          <GoogleLogin 
              
                onSuccess={credentialResponse => {
                  if (credentialResponse.credential) {
                    const details:any=jwtDecode(credentialResponse.credential);
                    let info:string[]=details.email.split('@');
                    if(info[1]==="iitjammu.ac.in"){
                      toast.success("Logged in successfully.",{
                        style:{
                          background:"Chartreuse"
                        }
                      })
                    }
                    else{
                      toast.error("Uh-oh",{
                        description:"Please login with the valid email id",
                        style:{
                          background:"red"
                        }
                      })
                     
                    }
                  }
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            <br></br>
            <Button >View as guest</Button>
        </div>
      </div>
    </div>
  </>
}