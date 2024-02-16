import React from "react";

export function Aboutleft(props:Record<string,any>){
  return<>
    <div className="flex">
      <img src={props.image} className="w-1/3"></img>
      <div><p>{props.content}</p></div>
    </div>
  </>
}