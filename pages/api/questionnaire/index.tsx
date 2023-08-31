import { createTransport } from "nodemailer";
import {
  htmlQuestionnaireFormSubmission,
  textQuestionnaire,
  textQuestionnaireClient,
  htmlQuestionnaireFormSubmissionClient,
} from "../../../utils/emailHelpers";

// PUT /api/questionnaire
export default async function handle(req, res) {
  const transport = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  await transport.sendMail({
    to: req.body.email,
    from: `Gillette Kennels ${process.env.EMAIL_FROM}`,
    subject: `Your questionnaire at ${process.env.HOSTNAME}`,
    text: textQuestionnaireClient({
      // url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}`,
      data: req.body,
    }),
    html: htmlQuestionnaireFormSubmissionClient({
      // url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}`,
      data: req.body,
      host: process.env.HOSTNAME,
      origin: process.env.HOSTNAME,
      email: req.body.email,
    }),
  });

  await transport.sendMail({
    to: process.env.EMAIL_FROM,
    from: `Gillette Kennels ${req.body.email}`,
    subject: `Questionnaire Submission from ${req.body.name}`,
    text: textQuestionnaire({
      // url: `${process.env.HOSTNAME}/questionnaire`,
      data: req.body,
    }),
    html: htmlQuestionnaireFormSubmission({
      // url: `${process.env.HOSTNAME}/questionnaire/${questionnaire.id}`,
      data: req.body,
      host: process.env.HOSTNAME,
      origin: process.env.HOSTNAME,
      email: req.body.email,
    }),
  });

  res.status(200).json({ message: "Success" });
}
