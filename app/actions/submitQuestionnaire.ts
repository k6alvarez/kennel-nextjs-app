"use server";
import { INITIAL_QUESTIONNAIRE_FORM_STATE } from "@/components/forms/helpers";
import { transport } from "./nodeMailer/transport";

import {
  QuestionnaireSubmission,
  htmlQuestionnaireFormSubmission,
  htmlQuestionnaireFormSubmissionClient,
  textQuestionnaire,
  textQuestionnaireClient,
} from "./emailHelpers";

const validateFields = (fields: Partial<QuestionnaireSubmission>) => {
  let errors: any = {};
  fields &&
    Object.entries(INITIAL_QUESTIONNAIRE_FORM_STATE).filter(
      ([_key, input]: any, i) => {
        const fieldIsRequired = input.name === fields[input.name]?.toString();
        const fieldIsEmpty = fields[input.name]?.length === 0;

        if (fieldIsRequired && fieldIsEmpty) {
          errors[input.name] = `This field is required.`;
        }

        if (
          input.name === "email" &&
          !/^[^@]+@[^@]+\.[^@]+$/.test(fields[input.name])
        ) {
          errors[input.name] = `${input.label} is not a valid email address.`;
        }
      }
    );
  return errors;
};

export const submitQuestionnaire = async (
  prevState: any,
  formData: FormData
) => {
  const rawFormData = Object.fromEntries(formData.entries());

  const body = INITIAL_QUESTIONNAIRE_FORM_STATE.reduce((acc, curr) => {
    acc[curr.name] = rawFormData[curr.name]?.toString() || "";
    return acc;
  }, {} as any);

  const errors = validateFields(body);

  if (Object.keys(errors).length) {
    return {
      statusMessage: {
        message: errors[Object.keys(errors)[0]],
        type: "error",
      },
      errors,
    };
  }

  try {
    const result = await prisma?.questionnaire.create({
      data: {
        ...body,
      },
    });

    if (!result) {
      return {
        statusMessage: {
          message:
            "An error occurred, refresh the page and try again. If the problem persists, please contact us.",
          type: "error",
        },
      };
    }

    const emailTransportClient = await transport.sendMail({
      to: body.email,
      from: `Gillette Kennels ${process.env.EMAIL_RECIEVERS}`,
      subject: `Your questionnaire at ${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
      text: textQuestionnaireClient({
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/res-guest/${"0"}`,
      }),
      html: htmlQuestionnaireFormSubmissionClient({
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/res-guest/${"0"}`,
        origin: process.env.NEXT_PUBLIC_DOMAIN_URL,
      }),
    });

    const emailTransportBusiness = await transport.sendMail({
      to: process.env.EMAIL_RECIEVERS,
      from: `Gillette Kennels ${body.email}`,
      subject: `Questionnaire Submission from ${
        body.name + " " + body.lastName
      }`,
      text: textQuestionnaire({
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/res-guest/${"0"}`,
      }),
      html: htmlQuestionnaireFormSubmission({
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/res-guest/${"0"}`,
        origin: process.env.NEXT_PUBLIC_DOMAIN_URL,
        data: body,
      }),
    });

    if (!emailTransportClient || !emailTransportBusiness) {
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
