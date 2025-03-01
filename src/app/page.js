import { fetchAuthUserAction } from "@/actions";
import Logout from "@/components/log-out";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await fetchAuthUserAction();
  if (!currentUser?.success) return redirect("/sign-in");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to Next.js Authentication
        </h1>
        <p className="text-gray-600">Your secure authentication system</p>
        <div className="mt-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              {currentUser?.data?.userName}
            </h2>
            <p className="text-gray-500">{currentUser?.data?.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <Logout />
        </div>
      </div>
    </div>
  );
}
