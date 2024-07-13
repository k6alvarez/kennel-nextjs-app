"use server";
import prisma from "@/lib/prisma";
import { GuestReservation } from "@prisma/client";
import { transport } from "./nodeMailer/transport";
import {
  htmlNewReservation,
  htmlNewReservationClient,
  textNewReservation,
  textNewReservationClient,
} from "./emailHelpers";

const validateEmailData = (data: any) => {
  if (
    !data.name ||
    !data.email ||
    !data.message ||
    !data.interest ||
    !data.subject
  ) {
    throw new Error("Missing required fields", {
      cause: `Please complete all required fields to continue.`,
    });
  }
};

export const sendGuestReservationRequest = async (
  data: Partial<GuestReservation>
) => {
  const reservationId = data.id;
  delete data.id;

  if (!reservationId) {
    throw new Error("Something went wrong.", {
      cause:
        "Refresh the page and enter your information again. If the problem persists, contact us.",
    });
  }

  try {
    // validateEmailData(body);

    const email = await transport.sendMail({
      to: data.email,
      from: `Gillette Kennels ${process.env.EMAIL_RECIEVERS}`,
      subject: `Your reservation at ${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
      text: textNewReservationClient({
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/res-guest/${reservationId}`,
      }),
      html: htmlNewReservationClient({
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/res-guest/${reservationId}`,
        origin: process.env.NEXT_PUBLIC_DOMAIN_URL,
      }),
    });
    await transport.sendMail({
      to: process.env.EMAIL_RECIEVERS as string,
      from: `${data.name} ${data.lastName} <${data.email}>`,
      subject: `New Client Reservation `,
      text: textNewReservation({
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/res-guest/${reservationId}`,
      }),
      html: htmlNewReservation({
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/res-guest/${reservationId}`,
        host: process.env.NEXT_PUBLIC_DOMAIN_URL,
        origin: process.env.NEXT_PUBLIC_DOMAIN_URL,
        email: data.email,
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

    const guestReservation = await prisma?.guestReservation.update({
      where: {
        id: reservationId,
      },
      data: {
        ...data,
        submitted: true,
      },
    });

    return {
      reservation: guestReservation,
      statusMessage: {
        message:
          "Reservation request sent successfully. We'll be in touch soon.",
        type: "success",
      },
    };
  } catch (error) {
    return {
      statusMessage: {
        message: (error as Error).message || "An error occurred",
        cause: (error as Error).cause,
        type: "error",
      },
    };
  }
};
