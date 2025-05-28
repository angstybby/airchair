import { redirect } from "next/navigation";
import { auth } from "i/server/auth";
import Sidebar from "../_components/sidebar";
import WorkspaceCard from "../_components/workspaceCard";
import { getUserWorkspaces } from "i/lib/workspaces";
import CreateWorkspaceModal from "../_components/createWorkspaceModal";
import { db } from "i/server/db";
import SignOutButton from "../_components/signOutButton";

export default async function LandingPage() {
  const session = await auth();

  if (!session || typeof session !== "object" || !("userId" in session)) {
    redirect("/signin");
  }

  const user = await db.user.findUnique({
    where: { id: session.userId as string },
  });

  if (!user) {
    redirect("/");
  }

  const workspaces = await getUserWorkspaces(user.id);

  return (
    <div className="relative flex min-h-screen">
      <Sidebar/>
      <main  className="flex-1 p-6">
        <h1>Welcome {user.name}</h1>
        <h1 className="text-2xl font-bold mb-8">Home</h1>
        <div className="mb-4">
          <CreateWorkspaceModal />
        </div>

        <div className="flex flex-wrap gap-6 p-6">
          {workspaces.map((ws) => (
            <WorkspaceCard key={ws.id} id={ws.id} name={ws.name} />
          ))}
        </div>

        {/* <Link
          href="/workspaces/create"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          + New Workspace
        </Link> */}

        <SignOutButton/>
      </main>
    </div>
  )
}