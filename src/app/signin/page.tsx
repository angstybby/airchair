import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import SignInClient from "./SignInClient";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      redirect("/landing");
    } catch {
      // Do nothing; continue to render sign in form
    }
  }

  return <SignInClient />;
}