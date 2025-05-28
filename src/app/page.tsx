import { auth } from "i/server/auth";
import { redirect } from "next/navigation";
import SignIn from "./signin/page";

export default async function Home() {
  const session = await auth();


  if (session?.userId) {
    redirect("/landing");
  }

  return <SignIn/>;
}
