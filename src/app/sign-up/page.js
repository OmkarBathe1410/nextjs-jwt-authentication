"use client";

import { Label } from "@/components/ui/label";
import { initialSignUpFormData, userRegistrationFormControls } from "@/utils";
import CommonFormElement from "@/components/form-element/page";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { registerUserAction } from "@/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isSignUpValid = useMemo(() => {
    return Object.keys(signUpFormData).every(
      (key) => signUpFormData[key].trim() !== ""
    );
  }, [signUpFormData]);

  async function handleSignUp(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await registerUserAction(signUpFormData);
      if (result?.data) router.push("/sign-in");
    } catch (error) {
      console.error("Sign-up error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Create an Account
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Join us and start your journey!
        </p>
        <form onSubmit={handleSignUp} className="space-y-4">
          {userRegistrationFormControls.map((controlItem) => (
            <div key={controlItem.name} className="text-black flex flex-col">
              <Label className="mb-1">{controlItem.label}</Label>
              <CommonFormElement
                value={signUpFormData[controlItem.name]}
                currentItem={controlItem}
                onChange={(event) =>
                  setSignUpFormData({
                    ...signUpFormData,
                    [event.target.name]: event.target.value,
                  })
                }
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}
          <Button
            disabled={!isSignUpValid || loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
            type="submit"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : null}
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
