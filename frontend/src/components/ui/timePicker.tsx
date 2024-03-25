import React, { useState } from "react";

const Timededo = (props: { text: string }) => {
  return (
    <div className={`relative w-full`}>
      <input
        type="time"
        className={`w-full h-10 rounded-lg pl-12`}
      />
      <span
        className={`absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500`}
        style={{ zIndex: 10 }}
      >
        {props.text}
      </span>
    </div>
  );
};

export default Timededo;
