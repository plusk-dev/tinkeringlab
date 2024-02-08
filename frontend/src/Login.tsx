import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import * as React from 'react';
import { Button } from "./components/ui/button";

import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "./components/ui/card";
export default function Login(){
  return<>
    
    <h1>Welcome</h1>
    <Button>View as guest</Button>

    {/* <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardContent>1,2,3 mike testing</CardContent>
      </CardHeader>

    </Card> */}

    <GoogleLogin
        onSuccess={credentialResponse => {
          if(credentialResponse.credential){
            let info=jwtDecode(credentialResponse.credential);
            console.log(info);
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
  />
  </>
}