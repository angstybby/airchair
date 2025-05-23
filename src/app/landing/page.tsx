import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "i/server/auth";
import Sidebar from "../_components/sidebar";
import WorkspaceCard from "../_components/workspaceCard";
import { getUserWorkspaces } from "i/lib/workspaces";
import CreateWorkspaceModal from "../_components/createWorkspaceModal";

export default async function LandingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const workspaces = await getUserWorkspaces(session.user.id);

  return (
    <div className="relative flex min-h-screen">
      <Sidebar/>
      <main  className="flex-1 p-6">
        <h1>Welcome {session.user?.name}</h1>
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

        <Link
          href="/api/auth/signout"
          className="absolute right-6 top-6 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Sign out
        </Link>
      </main>
    </div>
  )
}