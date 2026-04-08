"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Logout() {
  const router = useRouter();
  return (
    <div className="mt-auto">
      <button
        onClick={() => {
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
