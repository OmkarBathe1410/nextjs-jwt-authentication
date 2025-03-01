"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions";
import { Loader2, LogOut } from "lucide-react";

function Logout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    // Replace confirm() with a better modal-based approach in real UI
    if (!window.confirm("Are you sure you want to log out?")) return;
    setLoading(true);
    try {
      await logoutAction();
      router.replace("/sign-in"); // Prevents going back to the logout screen
    } catch (error) {
      console.error("Logout failed:", error);
      setLoading(false); // Ensure loading state is reset on failure
    }
  }

  return (
    <Button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition disabled:opacity-50"
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <LogOut size={18} />
      )}
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}

export default Logout;
