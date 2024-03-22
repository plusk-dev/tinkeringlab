import React from "react";

interface Data {
  name: string;
  type: string;
  id: string;
  status:string 
  desc:string
}


const ReqPage:React.FC<Data>=(props:Data)=>{
  return <>
    <div></div>
  </>
}

export default ReqPage;

