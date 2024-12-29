"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Validation Schema
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
    resolver: yupResolver(schema), // Use the Yup schema for validation
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      // Remove confirmPassword before sending the request
      const { confirmPassword, ...userData } = data;
      await axios.post("http://localhost:5000/auth/register", userData);
      router.push("/sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-blue-600 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className={`form-control w-full px-3 py-2 mt-1 border rounded-md ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className={`form-control w-full px-3 py-2 mt-1 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className={`form-control w-full px-3 py-2 mt-1 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className={`form-control w-full px-3 py-2 mt-1 border rounded-md ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
