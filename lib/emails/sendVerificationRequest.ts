import { Theme } from "antd/es/config-provider/context";
import { createTransport } from "nodemailer";
import { html } from "./html";
import { text } from "./text";

async function sendVerificationRequest(params: {
  identifier: any;
  url: any;
  provider: any;
  theme: any;
}) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: "Kenny Alvarez <kenny@kennyalvarez.com>",
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

export default sendVerificationRequest;
