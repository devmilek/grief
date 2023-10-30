"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";

interface PreparationTimeSelectProps {
  time: number;
}

const PreparationTimeSelect = ({ time }: PreparationTimeSelectProps) => {
  const [hours, setHours] = useState((time / 60).toFixed(0));
  const [minutes, setMinutes] = useState((time % 60).toFixed(0));

  const handleChange = () => {
    const newTime = hours * 60 + minutes;
    console.log(newTime);
  };

  return (
    <div>
      <Input
        placeholder="m"
        type="number"
        value={hours}
        onChange={(e) => {
          setHours(e.target.value);
          handleChange();
        }}
      />
      <Input
        placeholder="s"
        type="number"
        value={minutes}
        onChange={(e) => {
          setMinutes(e.target.value);
          handleChange();
        }}
      />
    </div>
  );
};

export default PreparationTimeSelect;
