import Link from "next/link";
import { auth } from "i/server/auth";
import { api, HydrateClient } from "i/trpc/server";

export default async function SignIn() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  return (
    <HydrateClient>
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
            <div className="w-full">
              <h1 className="text-sm font-medium mb-1">Email</h1>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className="w-full rounded border px-4 py-3 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
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
    </HydrateClient>
  );
}
