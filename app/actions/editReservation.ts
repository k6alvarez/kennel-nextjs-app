"use server";
import { auth } from "@/auth";
import { boardingDetailsInputs } from "@/components/forms/config/boardingDetailsInputs";
import { ownerDetailsInputs } from "@/components/forms/config/ownerDetailsInputs";
// import { validatePostData } from "@/components/posts/validatePostsData";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  htmlReservationConfirmedClient,
  textReservationConfirmedClient,
} from "./emailHelpers";
import { transport } from "./nodeMailer/transport";

export const editReservation = async (prevState: any, formData: FormData) => {
  const session = await auth();
  const isUserAdmin = (session?.user as User)?.permissions.includes("ADMIN");
  if (!session?.user || !isUserAdmin) return false;

  const rawFormData = Object.fromEntries(formData);

  let body: any = {};
  [...ownerDetailsInputs, ...boardingDetailsInputs].forEach((input) => {
    body[input.name] = rawFormData[input.name];
  });

  try {
    // validatePostData(body);

    const email = await transport.sendMail({
      to: body.email,
      from: `Gillette Kennels ${process.env.EMAIL_RECIEVERS}`,
      subject: `Your reservation at ${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
      text: textReservationConfirmedClient({
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/res-guest/${prevState.id}`,
      }),
      html: htmlReservationConfirmedClient({
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/res-guest/${prevState.id}`,
        origin: process.env.NEXT_PUBLIC_DOMAIN_URL,
      }),
    });

    if (!email) {
      return {
        statusMessage: {
          message: "Something went wrong. Please try again.",
          type: "error",
        },
      };
    }

    const response = await prisma?.guestReservation.update({
      where: { id: prevState.id },
      data: body,
    });

    if (!response) {
      return {
        statusMessage: {
          message: "An error occurred",
          type: "error",
        },
      };
    }

    revalidatePath(`/res-guest/${response.id}`), "page";

    return {
      statusMessage: {
        message: "Reservation updated successfully",
        type: "success",
        redirect: `/res-guest/${response.id}`,
      },
    };
  } catch (error) {
    return {
      statusMessage: {
        message: (error as Error).message || "An error occurred.",
        type: "error",
      },
    };
  }
};
