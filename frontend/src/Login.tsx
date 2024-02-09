import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import * as React from 'react';
import { Button } from "./components/ui/button";
// import logo from './assets/logo.svg'


export default function Login() {
  return <>
  <div className="flex h-screen flex-col">
      <div className="flex justify-center items-end h-1/2 bg-zinc-800 text-center">
        <img src={logo} className="h-2/3"/>
      </div>
      <div className="flex h-1/2 justify-center  bg-zinc-800" >
        <div className="flex flex-col text-center pt-10">
          <GoogleLogin 
                onSuccess={credentialResponse => {
                  if (credentialResponse.credential) {
                    let info = jwtDecode(credentialResponse.credential);
                    console.log(info);
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