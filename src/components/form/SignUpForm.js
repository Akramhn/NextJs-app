"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      await axios.post("http://localhost:5000/auth/register", userData);
      router.push("/sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40"></div> 
      
      <div className="relative z-10 bg-white shadow-xl rounded-xl p-8 w-full max-w-md transform transition duration-500 hover:scale-105">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-semibold text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-lg text-gray-600">Join us and experience a world of possibilities.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative mt-2">
              <input
                type="text"
                id="fullName"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
                {...register("fullName")}
              />
              <span className="absolute left-3 top-3 text-gray-500"><i className="fa fa-user"></i></span>
            </div>
            {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative mt-2">
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
                {...register("email")}
              />
              <span className="absolute left-3 top-3 text-gray-500"><i className="fa fa-envelope"></i></span>
            </div>
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-2">
              <input
                type="password"
                id="password"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
                {...register("password")}
              />
              <span className="absolute left-3 top-3 text-gray-500"><i className="fa fa-lock"></i></span>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative mt-2">
              <input
                type="password"
                id="confirmPassword"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />
              <span className="absolute left-3 top-3 text-gray-500"><i className="fa fa-lock"></i></span>
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Register Now
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-indigo-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
