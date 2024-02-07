import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";


export default function Login(){
  return<>
    
    <h1>Welcome</h1>
    <GoogleLogin
        onSuccess={credentialResponse => {
          let info=jwtDecode(credentialResponse.credential);
          console.log(info);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
  />
  </>
}