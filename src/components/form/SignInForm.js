"use client";
import { useForm } from "react-hook-form";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useStore from "../../app/store/userStore"; 
import Link from "next/link";  

export default function SignInForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    const session = await getSession();

    if (res.ok) {
      if (session) {
        console.log(session.token.user);
        setUser(session.token.user || "");
        router.push("/hello-page");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 bg-white shadow-xl rounded-xl p-8 w-full max-w-md transform transition duration-500 hover:scale-105">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-lg text-gray-600">Sign in to continue your journey.</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative mt-2">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className={`w-full p-4 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
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
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className={`w-full p-4 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span className="absolute left-3 top-3 text-gray-500"><i className="fa fa-lock"></i></span>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-indigo-600 hover:underline font-semibold">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
