import { auth } from "@/auth";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import ContentItem from "@/components/content/ContentItem";
import { Content } from "@/components/ui/Content";
import Link from "next/link";
import { User } from "@prisma/client";

export const generateMetadata = async () => {
  try {
    const session = await auth();
    const user = session?.user as User;
    return {
      title: `Create Reservation | ${
        session?.user?.email
          ? `Logged in as ${user.email}`
          : `New or Existing Client?`
      }`,
      description: `Create a new reservation for your pet`,
    };
  } catch (e) {
    return {
      title: `Create Reservation`,
      description: `Create a new reservation for your pet`,
    };
  }
};

export default async function CreateReservationPage() {
  const session = await auth();
  const user = session?.user as User;
  const isAdmin = user?.permissions?.includes("ADMIN");

  return (
    <Content>
      {(!session || isAdmin) && (
        <div>
          <ContentItem
            page="RESERVATIONS"
            section="MAIN"
            name="reservationWelcome"
          />
          <h1 className="text-center mt-8">New or Existing Client?</h1>
          <div className="flex flex-col items-center justify-center my-6 gap-8">
            <Link
              className="text-2xl text-center bg-primary text-white p-6 rounded-xl big-button"
              href="/create-reservation/new-client"
            >
              <div className="flex flex-col gap-4">
                <span>
                  <UserAddOutlined /> New Client
                </span>
                <span className="text-sm">
                  A new client has never boarded with us before.
                </span>
              </div>
            </Link>
            <Link
              className="text-2xl text-center bg-primary text-white p-6 rounded-xl big-button"
              href="/auth/signin?status=existingClient"
            >
              <div className="flex flex-col gap-4">
                <span>
                  <UserOutlined /> Existing Client
                </span>
                <span className="text-sm">
                  An existing client has boarded with us the past.
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
      {(session || isAdmin) && (
        <>
          <ContentItem
            page="RESERVATIONS"
            section="MAIN"
            name="reservationCreate"
          />
          <p>Logged in user </p>
        </>
      )}
    </Content>
  );
}
