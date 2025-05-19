import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "i/server/auth";

export default async function LandingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
      <h1>This is your Landing Page</h1>

      <Link
        href="/api/auth/signout"
        className="mt-4 inline-block rounded bg-red-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Sign out
      </Link>
    </div>
  )
}