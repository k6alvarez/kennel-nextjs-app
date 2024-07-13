import prisma from "@/lib/prisma";
import { Content } from "@/components/ui/Content";
import React from "react";
import { auth } from "@/auth";
import { EditReservation } from "@/components/forms/EditReservation";
// export const generateMetadata = async () => {
//   try {
//     let appSettings = await prisma?.appSetting.findFirst();
//     let data = appSettings || {
//       name: "Reservation",
//       slogan: "View all posts",
//     };

//     return {
//       title: `Reservation | ${data.name}`,
//       description: `View all blog posts from ${data.name}`,
//     };
//   } catch (e) {
//     return {
//       title: `Reservation | View all posts`,
//       description: `Reservation from all users`,
//     };
//   }
// };

const EditReservationPage = async ({ params }: { params: { id: string } }) => {
  const reservation = await prisma?.guestReservation.findUnique({
    where: { id: params.id },
    include: {
      pets: true,
    },
  });
  const session = await auth();

  if (!session) {
    return <Content>Access Denied. Please login to continue.</Content>;
  }

  return (
    <Content>
      <h1>Edit Reservation</h1>
      <p>Edit the reservation details below.</p>
      {reservation ? (
        <>
          <EditReservation reservation={reservation} />
        </>
      ) : (
        <p>Reservation not found</p>
      )}
    </Content>
  );
};

export default EditReservationPage;
