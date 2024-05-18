import { auth, signIn, signOut } from "@/auth";

export default async function SignIn() {
  const session = await auth();

  return (
    <div>
      {!session?.user ? "You are not signed in" : session.user.email}
      {!session?.user ? (
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <button type="submit">Sign In</button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      )}
    </div>
  );
}
