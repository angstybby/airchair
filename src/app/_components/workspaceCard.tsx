// components/WorkspaceCard.tsx
import Link from "next/link";

type Props = {
  id: string;
  name: string;
};

export default function WorkspaceCard({ id, name }: Props) {
  return (
    <Link href={`/workspaces/${id}`}>
      <div className="rounded-xl border bg-white p-6 shadow hover:shadow-lg transition cursor-pointer">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-500">Click to open workspace</p>
      </div>
    </Link>
  );
}
