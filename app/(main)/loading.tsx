"use client";

import React from "react";
import Lottie from "lottie-react";
import * as loader from "@/assets/lottie-loader.json";

const Loading = () => {
  return (
    <div className="container flex items-center justify-center h-screen absolute top-0 left-0">
      <Lottie
        animationData={loader}
        style={{
          width: "100px",
        }}
        className=""
      />
    </div>
  );
};

export default Loading;
