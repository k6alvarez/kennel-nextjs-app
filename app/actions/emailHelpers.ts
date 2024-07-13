// import { INITIAL_QUESTIONNAIRE_FORM_STATE } from "../components/Forms/helpers";

import { INITIAL_QUESTIONNAIRE_FORM_STATE } from "@/components/forms/helpers";
import config from "@/tailwind.config";
import { Questionnaire } from "@prisma/client";

const theme = {
  primary: `rgba(${config.theme?.tokens?.colors?.primary})`,
  white: `rgba(${config.theme?.tokens?.colors?.white})`,
  black: `rgba(${config.theme?.tokens?.colors?.black})`,
  secondary: `rgba(${config.theme?.tokens?.colors?.secondary})`,
};

export const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};

export const businessMailList = [
  process.env.EMAIL_RECIEVERS,
  process.env.EMAIL_FROM_FORWARD,
];

export function getHeader({ origin = "" }: { origin?: string } = {}) {
  return `
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${theme.primary}; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center" style="font-size: 22px; font-family: Helvetica, Arial, sans-serif;">
          <ul style="list-style:none; margin: 0; padding: 0; display: flex; justify-content: center;gap: 14px; align-items: center;">
            <li>              
              <a href="${origin}" style="color: ${theme.white}; text-decoration: none;">
                <div style="display:flex; align-items:center;">
                  <div style="display: flex; position: relative; align-items: center;">
                  <img src="https://res.cloudinary.com/dhcv2fdfq/image/upload/v1718568255/gk-app/vdyzhybggcnpyqygxtg1.svg" alt="Gillette Kennels Logo" style="width: 60px; margin-left: 10px;"/>  
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-size:2rem">Gillette Kennels</span>    
                    <span style="font-size: 0.75rem; line-height: 1rem;">An obedient dog, is a happy dog.</span>                
                  </div>
                  </div>
                </div>
              </a>
            </li>           
          </ul>
        </td>
      </tr>
    </table>
  `;
}

export function getFooter() {
  return `
  <tr>
    <td style="text-align: left; padding-right: 10px; font-size: 12px; font-weight: bold;">
      <p>&copy; ${getYear()} Gillette Kennels. All Rights Reserved</p>
    </td>
  </tr>
  `;
}
/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
export function htmlNewReservationClient(params?: {
  url?: string;
  host?: string;
  origin?: string;
  email?: string;
}) {
  const { url, origin } = params!;

  return `
  <body style="background: ${theme.secondary}; padding: 10px;">
  
  
    ${getHeader({ origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${
        theme.white
      }; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
            theme.black
          }; line-height: 1.2;">
          Thank you for your reservation with Gillette Kennels.<br />
          Your reservation is pending approval.<br />
          We will contact you via email for confirmation.<br />
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${
                theme.secondary
              }">
                <a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
                    theme.white
                  }; text-decoration: none; border-radius: 5px; padding: 10px 20px; background-color: ${
    theme.primary
  }; display: inline-block; font-weight: bold;"> View your reservation details </a></td>
            </tr>
          </table>
        </td>
      </tr>
      ${getFooter()}
    </table>
  </body>
  `;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function textNewReservationClient({ url }: { url: string }) {
  return `Thank you for your reservation at ${process.env.HOSTNAME}. Your reservation is pending approval. We will contact you via email for confirmation. View your reservation details: ${url} `;
}

export function htmlNewReservation(params?: {
  url?: string;
  host?: string;
  origin?: string;
  email?: string;
  isUser?: boolean;
}) {
  const escapedHost = params?.host?.replace(/\./g, "&#8203;.");

  return `
  <body style="background: ${theme.secondary}; padding: 10px;">
  
  
    ${getHeader({ origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${
        theme.white
      }; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
            theme.black
          };">
          ${
            params?.isUser ? "Existing" : "New"
          } client reservation submitted at <a href="${escapedHost}" style="color: ${
    theme.black
  }; text-decoration: none;">${escapedHost}</a>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${
                theme.secondary
              }"><a href="${params?.url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
                    theme.black
                  }; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${
    theme.primary
  }; display: inline-block; font-weight: bold;"> View reservation details </a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
            theme.black
          };">
          This reservation is pending approval.
        </td>
  
      </tr>
      ${getFooter()}
    </table>
  </body>
  `;
}

export function textNewReservation({
  url,
  isUser = false,
}: {
  url: string;
  isUser?: boolean;
}) {
  return `${isUser ? "Existing" : "New"} client reservation submitted at ${
    process.env.HOSTNAME
  }. This reservation is pending approval. View the reservation details: ${url} `;
}

export function textReservationCancelledClient({ url }: { url: string }) {
  return `Your reservation at ${process.env.HOSTNAME} has been cancelled. View the reservation details: ${url}. Please contact us if you have any questions.`;
}

export function htmlReservationCancelledClient(params?: {
  url?: string;
  host?: string;
  origin?: string;
  email?: string;
}) {
  const escapedHost = params?.host?.replace(/\./g, "&#8203;.");

  return `
  <body style="background: ${theme.secondary}; padding: 10px;">
  
  
    ${getHeader({ origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${
        theme.white
      }; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
            theme.black
          };">
          Your reservation at <a href="${escapedHost}" style="color: ${
    theme.black
  }; text-decoration: none;">${escapedHost}</a> has been cancelled. Please contact us if you have any questions.
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${
                theme.secondary
              }"><a href="${params?.url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
                    theme.black
                  }; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${
    theme.primary
  }; display: inline-block; font-weight: bold;"> View reservation details </a></td>
            </tr>
          </table>
        </td>
      </tr>      
      ${getFooter()}
    </table>
  </body>
  `;
}

export function textReservationCancelled({ url }: { url: string }) {
  return `The reservation at ${process.env.HOSTNAME} has been cancelled. View the reservation details: ${url}.`;
}

export function htmlReservationCancelled(params?: {
  url?: string;
  host?: string;
  origin?: string;
  email?: string;
}) {
  const escapedHost = params?.host?.replace(/\./g, "&#8203;.");

  return `
  <body style="background: ${theme.secondary}; padding: 10px;">
  
  
    ${getHeader({ origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${
        theme.white
      }; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
            theme.black
          };">
          The reservation at <a href="${escapedHost}" style="color: ${
    theme.black
  }; text-decoration: none;">${escapedHost}</a> has been cancelled.
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${
                theme.secondary
              }"><a href="${params?.url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
                    theme.black
                  }; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${
    theme.primary
  }; display: inline-block; font-weight: bold;"> View reservation details </a></td>
            </tr>
          </table>
        </td>
      </tr>      
      ${getFooter()}
    </table>
  </body>
  `;
}

export function htmlNewProfile(params: {
  url: string;
  host: string;
  origin: string;
  email: string;
}) {
  const { url, host, origin } = params;
  const newUrl = new URL(url);
  newUrl.searchParams.delete("callbackUrl");
  newUrl.searchParams.set("callbackUrl", "/profile");

  return `
<body style="background: ${theme.secondary}; padding: 10px;">
  ${getHeader({ origin })}


  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${theme.white}; max-width: 1000px; margin: 10px auto; ">
    <tr>
      <td align="center" style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
        theme.black
      };">
        Please verify your email address using the link below to access your profile.
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${
              theme.secondary
            }">
              <a href="${newUrl}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
    theme.black
  }; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${
    theme.primary
  }; display: inline-block; font-weight: bold;">
                Log in to access your account.
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
          theme.black
        };">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
    ${getFooter()}
  </table>
</body>
`;
}

export function textNewProfile({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

export function textContactFormSubmission({
  url,
  message,
  name,
  email,
  interest,
}: {
  url: string;
  message: string;
  name: string;
  email: string;
  interest: string;
}) {
  return `New contact form submission from ${process.env.HOSTNAME}/contact. Message: ${message}, Name: ${name}, Email: ${email}, Reason for contact: ${interest}`;
}

export function htmlContactFormSubmission(params?: {
  url?: string;
  host?: string;
  origin?: string;
  email?: string;
  message?: string;
  name?: string;
  interest?: string;
}) {
  const escapedHost = params?.host?.replace(/\./g, "&#8203;.");

  return `
  <body style="background: ${theme.secondary}; padding: 10px;">
  
  
    ${getHeader({ origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${
        theme.white
      }; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
            theme.black
          };">
          New client contact form submitted at <a href="${escapedHost}" style="color: ${
    theme.black
  }; text-decoration: none;">${escapedHost}</a>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;">
                <p>Reason for contact: ${params?.interest}</p>
                <p>Email: ${params?.email}</p>
                <p>Phone: ${params?.name}</p>
                <p>Message: ${params?.message}</p>            
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

export function htmlReservationConfirmedClient(params?: {
  url?: string;
  origin?: string;
}) {
  const { url, origin } = params!;
  return `
    <body style="background: ${theme.secondary}; padding: 10px;">
      ${getHeader({ origin })}         
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${
          theme.white
        }; max-width: 1000px; margin: 10px auto; ">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
              theme.black
            };">
            <p>Your reservation has been confirmed.</p>
            <p>Please review your reservation details using the link provided as some of your reservation details may have changed including:</p>
            <ul style="display: flex; flex-direction: column; align-items: center;">
              <li>Check-in and check-out times</li>
              <li>Requested run size</li>
            </ul>          
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${
                  theme.secondary
                }"><a href="${url}"
                    target="_blank"
                    style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
                      theme.black
                    }; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${
    theme.primary
  }; display: inline-block; font-weight: bold;"> View your reservation details </a></td>
              </tr>
            </table>
          </td>
        </tr>        
        ${getFooter()}
      </table>
    </body>
    `;
}

export function textReservationConfirmedClient({ url }: { url: string }) {
  return `Thank you for your reservation at ${process.env.HOSTNAME}. Your reservation has been confirmed. Please review your reservation details using the link provided as your check-in and check-out times may have changed.View your reservation details at ${url}`;
}

export function textQuestionnaireDepositRecieved({ url }: { url: string }) {
  return `A client has made a payment to their questionnaire at ${url}`;
}

export function htmlQuestionnaireDepositRecieved(params?: {
  url?: string;
  origin?: string;
}) {
  return `
    <body style="background: ${theme.secondary}; padding: 10px;">
      ${getHeader({ origin })}
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${
          theme.white
        }; max-width: 1000px; margin: 10px auto; ">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
              theme.black
            };">
            <p>A client has made a payment to their questionnaire.</p>            
            <p><a href="${params?.url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
                    theme.black
                  }; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${
    theme.primary
  }; display: inline-block; font-weight: bold;"> View questionnaire details </a></p>
            
          </td>
        </tr>
        ${getFooter()}
      </table>
    </body>
    `;
}

// const renderData = (data: string) => {
//   return Object.keys(data)
//     .map((key) => {
//       return (
//         data[key] &&
//         `<div style="display:flex;flex-direction:column;margin: 1rem 0;"><span>${INITIAL_QUESTIONNAIRE_FORM_STATE[key].label}</span><span>${data[key]}</span> </div>`
//       );
//     })
//     .join("");
// };

const renderDataTextOnly = (data: string) => {
  return Object.keys(data)
    .map((key: any) => {
      return (
        INITIAL_QUESTIONNAIRE_FORM_STATE[key] &&
        `${INITIAL_QUESTIONNAIRE_FORM_STATE[key].label}: ${data[key]}`
      );
    })
    .join("\n");
};

export function textQuestionnaire({ url }: { url?: string }) {
  return `A new questionnaire has been submitted from ${process.env.HOSTNAME}. View the questionnaire details at ${url}`;
}

export function htmlQuestionnaireFormSubmission(params?: {
  data: string;
  url?: string;
  host?: string;
  origin?: string;
  email?: string;
}) {
  const { origin } = params!;
  return `
  <body style="background: ${theme.secondary}; padding: 10px;">
  
  
    ${getHeader({ origin })}

    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${
        theme.white
      }; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
            theme.black
          };">
          New client questionnaire has been submitted.
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${
                theme.secondary
              }"><a href="${params?.url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
                    theme.black
                  }; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${
    theme.primary
  }; display: inline-block; font-weight: bold;"> View questionnaire details </a></td>
            </tr>
          </table>
        </td>
      </tr>
      ${getFooter()}
    </table>
  </body>
  `;
}

export type QuestionnaireSubmission =
  | keyof Partial<
      Omit<Questionnaire, "updatedAt" | "createdAt" | "id" | "email">
    >;

export function textQuestionnaireClient({ url }: { url: string }) {
  return `We have received your questionnaire from ${process.env.HOSTNAME}. We will contact you for next steps. View your questionnaire details at ${url}`;
}
export function htmlQuestionnaireFormSubmissionClient(params?: {
  url?: string;
  origin?: string;
}) {
  const { origin } = params!;
  return `
  <body style="background: ${theme.secondary}; padding: 10px;">
  
  
    ${getHeader({ origin })}
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${
          theme.white
        }; max-width: 1000px; margin: 10px auto; ">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
              theme.black
            };">
            <p>Thank you for your questionnaire submission. Your questionnaire is pending review. We will contact you via email for next steps.</p>               
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${
                  theme.secondary
                }"><a href="${params?.url}"
                    target="_blank"
                    style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${
                      theme.black
                    }; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${
    theme.primary
  }; display: inline-block; font-weight: bold;"> View your questionnaire details </a></td>
              </tr>
            </table>
          </td>
        </tr>        
        ${getFooter()}
      </table>
  </body>
  `;
}
