"use client";
import { useLoginMutation } from "@/Services/queries/authApi";
import { LoginData } from "@/Services/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { apiSlice } from "@/Services/apiSlice";

function LoginForm() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const [viewPassword, setViewPassword] = useState(false);
  const [login, { isLoading: loggingIn }] = useLoginMutation<any>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = (form.username as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    if (password.length < 8) {
      alert("Password should be at least 8 characters");
      return;
    }

    const payload: LoginData = {
      username,
      password,
    };

    for (const key in payload) {
      const value = payload[key as keyof typeof payload];
      if (!value) {
        alert(`${key} is required`);
        return;
      }
    }

    try {
     const result:any = await login(payload).unwrap();

      if (result?.data?.token) {
        localStorage.setItem("token", result?.data?.token);
        dispatch(apiSlice.util.resetApiState());
        router.push("/dashboard");
      }
      else alert('Failed to sign in')
    } catch (error) {
      alert("Failed to Sign In");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) return router.replace("/dashboard");
    else return setLoading(false);
  }, []);

  if (loading) return <Loading></Loading>;

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 w-full shadow-xl border border-base-200"
    >
      
      <div className="card-body p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-center mb-4">
          Login to your account
        </h2>

        <fieldset className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="label-text">Username</label>
            <input
              name="username"
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter username"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label-text">Password</label>
            <input
              name="password"
              type={viewPassword ? "text" : "password"}
              className="input input-bordered w-full"
              placeholder="Enter password"
            />
          </div>

          <label className="flex items-center gap-2 text-sm mt-1 cursor-pointer">
            <input
              onChange={(e) => setViewPassword(e.target.checked)}
              type="checkbox"
              checked={viewPassword}
              className="checkbox checkbox-sm"
            />
            View Password
          </label>

          <button
            type="submit"
            className="btn btn-neutral w-full mt-2"
            disabled={loggingIn}
          >
            {loggingIn ? "Logging in..." : "Login"}
          </button>
        </fieldset>
      </div>
    </form>
  );
}

export default LoginForm;
