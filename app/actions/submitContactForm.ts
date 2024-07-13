"use server";
import { transport } from "./nodeMailer/transport";

const validateEmailData = (data: any) => {
  if (
    !data.name ||
    !data.email ||
    !data.message ||
    !data.interest ||
    !data.subject
  ) {
    throw new Error("Missing required fields");
  }
};

export const submitContactForm = async (prevState: any, formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries());

  const body = {
    name: rawFormData.name,
    email: rawFormData.email,
    message: rawFormData.message,
    interest: rawFormData.interest,
    subject: rawFormData.subject,
  };

  try {
    validateEmailData(body);

    const result = await transport.sendMail({
      to: body.email as string,
      from: "Kenny Alvarez <kenny@kennyalvarez.com>",
      subject: `Thank you for contacting us!`,
      text: `We'll be in touch soon!`,
      html: `<p>We'll be in touch soon!</p>`,
    });

    if (!result) {
      return {
        statusMessage: {
          message: "An error occurred",
          type: "error",
        },
      };
    }

    return {
      statusMessage: {
        message: `Form submitted successfully! We'll be in touch soon.`,
        type: "success",
        redirect: `/`,
      },
    };
  } catch (error) {
    console.error("🚀 ~ error:", error);
    return {
      statusMessage: {
        message: "An error occurred",
        type: "error",
      },
    };
  }
};
