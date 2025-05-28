"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInClient() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
  
    if (res.ok) {
      console.log("logged in")
      router.push("/landing");
    } else {
      const data = await res.json();
      setError(data.error || "Email or password invalid");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <div>
          <h1 className="flex justify-center font-bold tracking-tight text-3xl">
           AirChair
          </h1>
          <h2>(An Airtable Clone)</h2>
        </div>
        {/* sign in form */}
        <div className="container flex flex-col items-center justify-center gap-3 w-full max-w-md">
          <h1 className="font-bold text-xl">Sign In</h1>
          <div className="flex flex-col w-full">
            <h1 className="text-sm font-medium mb-1">Email</h1>
            <form onSubmit={handleSubmit} className="w-full">
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className="w-full rounded border px-4 py-3 text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
              <label className="text-sm font-medium mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full rounded border px-4 py-3 text-sm"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-5 w-full rounded border bg-blue-300 px-4 py-2 text-black hover:bg-blue-600 hover:text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
