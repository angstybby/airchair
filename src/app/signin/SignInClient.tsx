"use client";
import Link from "next/link";
import { api } from "src/trpc/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import type { Session } from "next-auth";

interface Props {
  session: Session | null;
}

export default function SignInClient({session}: Props) {

  const [email, setEmail] = useState("");
  const helloQuery = api.post.hello.useQuery({ text: "from tRPC" });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("email", {
      email,
      callbackUrl: "/",
    })
  }

  return (
    // <HydrateClient>
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
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
            {helloQuery.data ? helloQuery.data.greeting : "Loading tRPC query..."}
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              or
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full border bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Continue with Google"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    // </HydrateClient>
  );
}
