"use client";
import { apiSlice } from "@/Services/apiSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="mt-auto">
      <button
        onClick={() => {
          dispatch(apiSlice.util.resetApiState());
          localStorage.removeItem("token");
          router.push("/");
        }}
        className="btn btn-primary w-full"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
