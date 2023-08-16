import { createTransport } from "nodemailer";
import { getFooter, getHeader } from "../auth/[...nextauth]";
import { themesMap } from "../../../components/appStyles";

// PUT /api/contact
export default async function handle(req, res) {
  const { name, email, message } = JSON.parse(req.body);
  const transport = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  await transport.sendMail({
    to: process.env.EMAIL_FROM,
    from: `${name} ${email}`,
    subject: `Contact Form Submission from ${process.env.HOSTNAME}`,
    text: text({ url: `${process.env.HOSTNAME}`, message, name, email }),
    html: htmlGKContact({
      url: `${process.env.HOSTNAME}}`,
      host: process.env.HOSTNAME,
      origin: process.env.HOSTNAME,
      theme: themesMap.light,
      name,
      email,
      message,
    }),
  });

  res.status(200).json({ message: "Success" });
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, message, name, email }) {
  return `New contact form submission from ${process.env.HOSTNAME}/contact. Message: ${message}, Name: ${name}, Email: ${email}`;
}

function htmlGKContact(params?: {
  url?: string;
  host?: string;
  origin?: string;
  email?: string;
  theme?: any;
  message?: string;
  name?: string;
}) {
  const { host, theme, origin } = params;
  const escapedHost = host?.replace(/\./g, "&#8203;.");

  const brandColor = theme?.primary || "#22d172";
  const color = {
    background: brandColor || "#f9f9f9",
    text: theme?.textSecondary || "#444",
    mainBackground: theme?.white || "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme?.buttonText || "#fff",
  };

  return `
  <body style="background: ${color.background}; padding: 10px;">
  
  
    ${getHeader({ color, origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${
        color.mainBackground
      }; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
            color.text
          };">
          New client contact form submitted at <a href="${escapedHost}" style="color: ${
    color.text
  }; text-decoration: none;">${escapedHost}</a>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;">
                <p>Email: ${params.email}</p>
                <p>Phone: ${params.name}</p>
                <p>Message: ${params.message}</p>            
              </td>
            </tr>
          </table>
        </td>
      </tr>
      ${getFooter()}
    </table>
  </body>
  `;
}
