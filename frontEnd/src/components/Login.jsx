import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify"; // or use shadcn/ui toast

const loginSchema = z.object({
  username: z.string().email({ message: "Valid email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");

    try {
      const formData = new URLSearchParams();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const response = await axiosClient.post("/auth/access-token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const token = response?.data?.access_token;
      if (!token) throw new Error("No token received");

      login(token); // sets user/token in context

      toast.success("Login successful");
      setTimeout(() => {
        if (user) {
          navigate("/manage");
        } else {
          // fallback in case user is set asynchronously
          navigate("/manage");
        }
      }, 500);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.statusText ||
        "Login failed";
      setServerError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md space-y-6">
        <h1 className="text-xl font-semibold text-center">Welcome Back</h1>
        <p className="text-sm text-gray-500 text-center">
          Sign in to your dashboard
        </p>

        {serverError && (
          <div className="text-red-600 text-sm text-center">{serverError}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("username")}
              type="email"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="user@example.com"
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between text-xs text-blue-600 mt-4">
          <a href="#" className="hover:underline">
            Create account?
          </a>
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          By using our services, you agree to our{" "}
          <a href="#" className="text-blue-600 underline">
            Terms & Conditions
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
