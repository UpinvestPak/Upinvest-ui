"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resendVerificationOtp, verifyRegistration } from "@/lib/redux/features/auth/authThunks";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const TwoStepVerification: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [cooldown, setCooldown] = useState(0);

  const { loading, error, pendingRegistration } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();

    if (!pendingRegistration?.email) {
      router.push("/auth/signup");
    }
  }, [pendingRegistration, router]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown(c => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^[a-zA-Z0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedOtp = pastedData.slice(0, 4).split("");

    if (pastedOtp.every(char => /^[a-zA-Z0-9]$/.test(char))) {
      setOtp(pastedOtp.concat(Array(4 - pastedOtp.length).fill("")));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pendingRegistration?.email) {
      toast.error("No pending registration found");
      return;
    }

    const otpString = otp.join("");
    if (otpString.length !== 4) {
      toast.error("Please enter all 4 digits");
      return;
    }

    try {
      await dispatch(
        verifyRegistration({
          email: pendingRegistration.email,
          otpCode: otpString,
        }),
      ).unwrap();

      toast.success("Email verified successfully!");
      router.push("/");
    } catch (err) {
      toast.error("Verification failed. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return;

    try {
      await dispatch(resendVerificationOtp(pendingRegistration?.email || "")).unwrap();
      toast.success("OTP resent successfully!");
      setCooldown(30);
    } catch (err) {
      toast.error(
        (err as Error)?.message || "Failed to resend OTP. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Verify Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Enter the 4 digit code sent to {pendingRegistration?.email}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  pattern="[a-zA-Z0-9]"
                  ref={el => {
                    inputRefs.current[index] = el; // Side effect: assigning to ref
                  }}                  value={otp[index]}
                  onChange={e => handleChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-14 h-14 text-center text-2xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              ))}
            </div>

            {error && <div className="text-center text-red-500">{error}</div>}

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                className={`text-blue-600 hover:text-blue-500 text-sm font-medium ${
                  cooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={cooldown > 0}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Didn't receive a code? Resend"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || otp.some(digit => !digit)}
              className={`w-full flex justify-center py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                loading || otp.some(digit => !digit) ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>

            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't share the verification code with anyone!
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoStepVerification;
