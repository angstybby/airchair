import SignInClient from "./SignInClient";
import { auth } from "i/server/auth";
import type { Session } from "next-auth";

export default async function SignInPage() {
  const session: Session | null = await auth();

  return <SignInClient session={session}/>;
}