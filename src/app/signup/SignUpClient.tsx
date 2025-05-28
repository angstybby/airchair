"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push("/signin");
    } else {
      alert("Failed to sign up");
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-6 text-3xl font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Name"
          required
          className="rounded border px-4 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="rounded border px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="rounded border px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}
