import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
