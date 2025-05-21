// components/Sidebar.tsx
import { Home, Folder, LayoutGrid, Plus, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-100 border-r p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8">AirChair</h1>

        <nav className="flex flex-col gap-4">
          <SidebarLink icon={<Home size={20} />} label="Home" href="/" />
          <SidebarLink icon={<Folder size={20} />} label="Workspaces" href="/workspaces" />
          <SidebarLink icon={<LayoutGrid size={20} />} label="Templates" href="/templates" />
        </nav>

        <button className="mt-6 flex items-center gap-2 text-sm text-blue-600 hover:underline">
          <Plus size={18} />
          Add New
        </button>
      </div>

      {/* Bottom: Settings/Profile */}
      <div>
        <SidebarLink icon={<Settings size={20} />} label="Settings" href="/settings" />
        {/* Replace with a profile picture dropdown later */}
      </div>
    </div>
  );
}

function SidebarLink({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
