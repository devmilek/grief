import React, { ChangeEvent, ClipboardEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";

interface OTPInputProps {
  setValue: (value: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ setValue }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // Change 4 to the length of your OTP

  const handleChange = (
    element: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (element.target.value.length > 1) return; // Ignore input if it's more than one digit

    setOtp([
      ...otp.slice(0, index),
      element.target.value,
      ...otp.slice(index + 1),
    ]);

    if (element.target.value && index < otp.length - 1) {
      const nextInput = document.getElementById(
        `otp${index + 1}`,
      ) as HTMLInputElement;
      nextInput?.focus();
    } else if (!element.target.value && index > 0) {
      const prevInput = document.getElementById(
        `otp${index - 1}`,
      ) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  useEffect(() => {
    setValue(otp.join(""));
  }, [otp, setValue]);

  const handlePaste = (element: ClipboardEvent<HTMLInputElement>) => {
    element.preventDefault();
    const pastedData = element.clipboardData.getData("text/plain");
    let newValue = pastedData.slice(0, 6);
    if (newValue.length < 6) {
      newValue = newValue + " ".repeat(6 - newValue.length);
    }
    setOtp(newValue.split(""));
  };

  const handleSubmit = () => {
    // Handle OTP submission here
    console.log(`OTP Submitted: ${otp.join("")}`);
  };

  return (
    <div className="flex space-x-2">
      {otp.map((value, index) => (
        <Input
          type="number"
          id={`otp${index}`}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          maxLength={1}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          key={index}
        />
      ))}
    </div>
  );
};

export default OTPInput;
