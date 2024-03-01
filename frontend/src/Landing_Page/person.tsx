import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';


export function Person(props:Record<string,any>){
  const [isSmall, setisSmall] = useState(false);
  window.addEventListener("resize", (_) => {
    setisSmall(window.innerWidth <= 1000);
  })
  useEffect(() => {
    setisSmall(window.innerWidth <= 1000);
  }, [])
  return<>
    	<div className={`overflow-visible  relative max-w-sm mx-auto bg-white shadow-2xl ring-1 ring-black/5 rounded-xl ${isSmall?'flex flex-col my-6':'inline-flex items-center gap-6 w-full my-5'}`}>
				<img className="absolute -left-6 w-24 h-24 rounded-full shadow-lg" src={props.image} />
				<div className="flex flex-col py-5 pl-24">
					<strong className="text-slate-900 text-sm font-medium dark:text-slate-200">{props.name}</strong>
					<span className="text-slate-500 text-sm font-medium dark:text-slate-400">{props.post}</span>
				</div>
			</div>
  </>
}