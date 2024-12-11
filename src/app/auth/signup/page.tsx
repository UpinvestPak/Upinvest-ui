// components/auth/RegisterForm.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { registerUser } from "@/lib/redux/features/auth/authThunks";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { FilerType, Role } from "@/types/auth";
import 'react-toastify/dist/ReactToastify.css';
import { clearError } from "@/lib/redux/features/auth/authSlice";


// Validation schema
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain at least one letter, one number, and one special character",
      ),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .regex(/^\d{10,15}$/, "Phone number must be greater then 9"),
    ntnNumber: z.string().regex(/^[0-9]{7}$/, "NTN number must be 7 digits"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    filerType: z.nativeEnum(FilerType),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ValidationSchema = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);


  const onSubmit = async (data: ValidationSchema) => {
    try {
      // Destructure confirmPassword out of the data object
      const { confirmPassword, ...registrationData } = data;

      const resultAction = await dispatch(
        registerUser({
          ...registrationData,
          role: Role.USERS,
        }),
      ).unwrap();

      toast.success(
        "Registration successful! Please check your email for verification.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            reset();
            router.push("/auth/two-step-verification");
          },
        }
      );
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

 
  const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    error,
    ...rest
  }: {
    label: string;
    name: keyof ValidationSchema;
    type?: string;
    placeholder: string;
    error?: string;
  }) => (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          className={`
            w-full rounded-lg border px-4 py-3
            ${error ? "border-red-500" : "border-gray-300"}
            transition-colors duration-200 focus:outline-none
            focus:ring-2 focus:ring-blue-500 dark:border-gray-600
            dark:bg-gray-800 dark:text-white
          `}
          placeholder={placeholder}
          {...register(name)}
          {...rest}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">


      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow dark:bg-gray-800 sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              label="Full Name"
              name="name"
              placeholder="Enter your full name"
              error={errors.name?.message}
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
            />

            <div className="relative">
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                error={errors.password?.message}
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="relative">
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message}
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <InputField
              label="Phone Number"
              name="phoneNumber"
              placeholder="Enter your phone number"
              error={errors.phoneNumber?.message}
            />

            <InputField
              label="NTN Number"
              name="ntnNumber"
              placeholder="Enter your NTN number"
              error={errors.ntnNumber?.message}
            />

            <InputField
              label="City"
              name="city"
              placeholder="Enter your city"
              error={errors.city?.message}
            />

            <InputField
              label="Country"
              name="country"
              placeholder="Enter your country"
              error={errors.country?.message}
            />

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Tax Filing Status
              </label>
              <select
                {...register("filerType")}
                className={`
                  w-full rounded-lg border border-gray-300 px-4 py-3
                  transition-colors duration-200 focus:outline-none
                  focus:ring-2 focus:ring-blue-500 dark:border-gray-600
                  dark:bg-gray-800 dark:text-white
                `}
              >
                <option value="">Select your status</option>
                <option value={FilerType.FILER}>Filer</option>
                <option value={FilerType.NON_FILER}>Non-Filer</option>
              </select>
              {errors.filerType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.filerType.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`
                  flex w-full justify-center rounded-lg bg-blue-600 px-4
                  py-3 text-white transition-colors
                  duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2
                  focus:ring-blue-500 focus:ring-offset-2
                  ${loading ? "cursor-not-allowed opacity-50" : ""}
                `}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            {error && (
              <div className="mt-4 text-center text-red-500">{error}</div>
            )}

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
              </span>
              <Link
                href="/auth/signin"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </div>

            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
