import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function SignIn() {
  const session = await auth();

  return (
    <div className="md:flex md:justify-end text-sm lg:text-base">
      {!session?.user ? (
        <Link href="/auth/signin">Log In</Link>
      ) : (
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <div className="flex flex-1 gap-4 justify-evenly">
            <Link href="/profile">Profile</Link>
            <button type="submit">Log Out</button>
          </div>
        </form>
      )}
    </div>
  );
}
