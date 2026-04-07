"use client";
import { useLoginMutation } from "@/Services/queries/authApi";
import { LoginData } from "@/Services/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [isClient, setIsClient] = useState(false);

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
      const result: any = await login(payload);
      console.log("result", result);

      if (result?.data?.data?.token) {
        localStorage.setItem("token", result.data.data?.token);
        router.push("/dashboard");
      }
    } catch (error) {
      alert("Failed to Sign In");
    }
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <form
          onSubmit={handleSubmit}
          className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
        >
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Username</label>
              <input
                name="username"
                type="text"
                className="input"
                placeholder="Username"
              />

              <label className="label">Password</label>
              <input
                name="password"
                type={viewPassword ? "text" : "password"}
                className="input"
                placeholder="Password"
              />

              <label className="label my-3">
                <input
                  onChange={(e) => setViewPassword(e.target.checked)}
                  type="checkbox"
                  checked={viewPassword}
                  className="checkbox"
                />
                View Password
              </label>

              <button
                type="submit"
                className="btn btn-neutral mt-4"
                disabled={loggingIn}
              >
                {loggingIn ? "Logging in..." : "Login"}
              </button>
            </fieldset>
          </div>
        </form>
      ) : (
        <></>
      )}
    </>
  );
}

export default LoginForm;
