import React, { useRef, useState } from "react";

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPassword = ({ onBack }: ForgotPasswordProps) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    console.log("OTP:", enteredOtp);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Verify OTP
        </h2>

        <p className="mt-2 text-gray-500">
          Enter the 6-digit OTP sent to your registered email.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              onPaste={handlePaste}
              className="w-12 h-12 sm:w-14 sm:h-14
                         rounded-lg border border-gray-300
                         text-center text-lg font-semibold
                         outline-none transition
                         focus:border-blue-500
                         focus:ring-2 focus:ring-blue-100"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={otp.join("").length !== 6}
          className="w-full rounded-lg bg-blue-600 px-4 py-3
                     font-semibold text-white shadow-md
                     hover:bg-blue-700 disabled:bg-gray-300
                     disabled:cursor-not-allowed"
        >
          Verify OTP
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
