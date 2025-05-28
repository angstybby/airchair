"use client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/auth/signout");
    router.push("/signin");
  }

  return (
    <button
      onClick={handleSignOut}
      className="absolute right-6 top-6 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
      Sign out
    </button>
  );
}
