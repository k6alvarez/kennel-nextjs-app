"use server";
import { petDetailsInputs } from "@/components/forms/config/petDetailsInputs";
import prisma from "@/lib/prisma";
import email from "next-auth/providers/email";
import { createTransport } from "nodemailer";

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

export const handleGuestPet = async (prevState: any, formData: FormData) => {
  const petDetails = petDetailsInputs
    .filter((input) => input.name !== "reservationId")
    .map((input) => input.name);
  const reservationId = formData.get("reservationId");
  console.log("🚀 ~ handleGuestPet ~ formData:", formData);

  let body = {} as any;

  petDetails.forEach((input) => {
    body[input] = formData.get(input) ?? prevState[input] ?? "";
  });

  try {
    // validateEmailData(body);
    const guestPet = await prisma?.guestPet.create({
      data: {
        ...body,
        reservations: {
          connect: {
            id: reservationId,
          },
        },
      },
    });

    console.log("🚀 ~ handleGuestPet ~ guestPet:", guestPet);

    return {
      ...prevState,
      ...guestPet,
      statusMessage: {
        message: "Pet added successfully",
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
