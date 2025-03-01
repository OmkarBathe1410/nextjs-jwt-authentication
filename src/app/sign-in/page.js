"use client";

import { Label } from "@/components/ui/label";
import { initialLoginFormData, userLoginFormControls } from "@/utils";
import CommonFormElement from "@/components/form-element/page";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { loginUserAction } from "@/actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function SignIn() {
  const [signInFormData, setSignInFormData] = useState(initialLoginFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignIn(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await loginUserAction(signInFormData);
      if (result?.success) {
        router.push("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-6">Sign in to continue</p>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          {userLoginFormControls.map((controlItem) => (
            <div key={controlItem.name} className="flex flex-col">
              <Label htmlFor={controlItem.name} className="text-gray-700 mb-1">
                {controlItem.label}
              </Label>
              <CommonFormElement
                id={controlItem.name}
                currentItem={controlItem}
                value={signInFormData[controlItem.name]}
                onChange={(event) =>
                  setSignInFormData({
                    ...signInFormData,
                    [event.target.name]: event.target.value,
                  })
                }
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-black"
              />
            </div>
          ))}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <p className="text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
