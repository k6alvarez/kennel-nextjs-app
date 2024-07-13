import { auth } from "@/auth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Content } from "@/components/ui/Content";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export const generateMetadata = async () => {
  try {
    const session = await auth();
    return {
      title: `Profile ${
        session && session.user?.email ? `for ${session.user?.email}` : ``
      } `,
      description: `View your profile`,
    };
  } catch (e) {
    return {
      title: `Profile`,
      description: `View your profile`,
    };
  }
};

export default async function ProfilePage() {
  let appSettings = await prisma?.appSetting.findFirst();
  const session = await auth();

  if (!session) return <Content>Not authenticated</Content>;

  return (
    <Content>
      <h1>Profile</h1>
      <p>
        <strong>Email:</strong> {session.user?.email}
      </p>
      {(session.user as User)?.permissions.includes("ADMIN") && (
        <>
          <AdminDashboard appSettings={appSettings} />
        </>
      )}
    </Content>
  );
}
