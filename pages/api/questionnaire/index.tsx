import { createTransport } from "nodemailer";
import {
  htmlContactFormSubmission,
  textContactFormSubmission,
} from "../../../utils/emailHelpers";

// PUT /api/questionnaire
export default async function handle(req, res) {
  //   const { name, email, message } = JSON.parse(req.body);
  console.log("JSON.parse(req.body)", req.body);
  const transport = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  //   await transport.sendMail({
  //     to: process.env.EMAIL_FROM,
  //     from: `${name} ${email}`,
  //     subject: `Questionnaire Form Submission from ${process.env.HOSTNAME}`,
  //     text: textContactFormSubmission({
  //       url: `${process.env.HOSTNAME}`,
  //       message,
  //       name,
  //       email,
  //     }),
  //     html: htmlContactFormSubmission({
  //       url: `${process.env.HOSTNAME}}`,
  //       host: process.env.HOSTNAME,
  //       origin: process.env.HOSTNAME,
  //       name,
  //       email,
  //       message,
  //     }),
  //   });

  res.status(200).json({ message: "Success" });
}
