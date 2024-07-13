"use server";
import { boardingDetailsInputs } from "@/components/forms/config/boardingDetailsInputs";
import { ownerDetailsInputs } from "@/components/forms/config/ownerDetailsInputs";
import prisma from "@/lib/prisma";

const validateEmailData = (data: any) => {
  if (!data.name || !data.email) {
    throw new Error("Missing required fields", {
      cause: `Please complete all required fields to continue.`,
    });
  }
};

export const handleNewClientReservation = async (
  prevState: any,
  formData: FormData
) => {
  const ownerDetails = ownerDetailsInputs.map((input) => input.name);
  const boardingDetails = boardingDetailsInputs.map((input) => input.name);

  let body = {} as any;
  [...ownerDetails, ...boardingDetails].forEach((input) => {
    body[input] = formData.get(input) ?? prevState[input] ?? "";
  });

  try {
    validateEmailData(body);
    if (body.email) {
      const user = await prisma?.user.findFirst({
        where: {
          email: body.email,
        },
      });
      if (user) {
        throw new Error("User already exists.", {
          cause:
            "A user with this email already exists. Please navigate to the login page to continue.",
        });
      }
    }
    if (body.id) {
      const updatedReservation = await prisma?.guestReservation.update({
        where: {
          id: body.id,
        },
        data: body,
      });
      return {
        reservation: updatedReservation,
        statusMessage: {},
      };
    } else {
      const guestReservation = await prisma?.guestReservation.create({
        data: body,
      });
      return {
        reservation: guestReservation,
        statusMessage: {},
      };
    }
  } catch (error) {
    return {
      statusMessage: {
        message: (error as Error).message || "An error occurred",
        cause: (error as Error).cause ?? "",
        type: "error",
      },
    };
  }
};
