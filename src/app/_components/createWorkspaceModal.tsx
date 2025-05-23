"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateWorkspacePage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/workspace", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      const { id } = await res.json();
      router.push(`/workspaces/${id}`);
    } else {
      alert("Failed to create workspace");
    }

    setLoading(false);
  };

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          + New Workspace
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">Create New Workspace</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Workspace name"
              required
              className="w-full rounded border p-2"
            />
            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
    
}