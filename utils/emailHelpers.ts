import { INITIAL_QUESTIONNAIRE_FORM_STATE } from "../components/Forms/helpers";
import { themesMap } from "../components/appStyles";

const theme = themesMap.light
const brandColor = theme?.primary
const color = {
  background: theme.emailBackground,
  text: theme.textSecondary,
  mainBackground: theme?.white,
  buttonBackground: theme.emailBackground,
  buttonBorder: brandColor,
  buttonText: theme.textSecondary,
}

export const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};

export function getHeader({ origin }) {
  return `
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center" style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          <ul style="list-style:none; margin: 0; padding: 0; display: flex; justify-content: space-between;gap: 14px; align-items: center;">
            <li>              
              <a href="${origin}" style="color: ${color.text}; text-decoration: none;">
                <div style="display:flex; align-items:center;">
                  <div style="display: flex; position: relative; align-items: center;">

                    <img src="${origin}/images/crest.svg" alt="Gillette Kennels" style="width: 55px; height: 59px;">
                    
                    <img style="position: absolute !important; top: 6px !important; filter: grayscale(100%); left: 10px !important; width: 35px; height: 39px;" src="${origin}/images/gk_new_crest_only.png" alt="Gillette Kennels">
                    
                    Gillette Kennels
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="${origin}/boarding" style="color: ${color.text}; text-decoration: none;">Boarding</a>
            </li>
            <li>
              <a href="${origin}/training" style="color: ${color.text}; text-decoration: none;">Training</a>
            </li>
          </ul>
        </td>
      </tr>
    </table>
  `
}

export function getFooter() {
  return `
  <tr>
    <td style="text-align: left; padding-right: 10px; font-size: 12px; font-weight: bold;">
      <p>&copy; ${getYear()} Gillette Kennels. All Rights Reserved</p>
    </td>
  </tr>
  `
}
/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
export function htmlNewReservationClient(params?: { url?: string; host?: string; origin?: string; email?: string }) {
  const { url, host, origin } = params
  const escapedHost = host?.replace(/\./g, "&#8203;.")

  return `
  <body style="background: ${color.background}; padding: 10px;">
  
  
    ${getHeader({ origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Thank you for your reservation at <a href="${escapedHost}" style="color: ${color.text}; text-decoration: none;">${escapedHost}</a>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;"> View your reservation details </a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Your reservation is pending approval. We will contact you via email for confirmation
        </td>
  
      </tr>
      ${getFooter()}
    </table>
  </body>
  `
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function textNewReservationClient({ url }) {
  return `Thank you for your reservation at ${process.env.HOSTNAME}. Your reservation is pending approval. We will contact you via email for confirmation. View your reservation details: ${url} `
}


export function htmlNewReservation(params?: { url?: string; host?: string; origin?: string; email?: string }) {
  const { url, host, origin } = params
  const escapedHost = host?.replace(/\./g, "&#8203;.")


  return `
  <body style="background: ${color.background}; padding: 10px;">
  
  
    ${getHeader({ origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          New client reservation submitted at <a href="${escapedHost}" style="color: ${color.text}; text-decoration: none;">${escapedHost}</a>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;"> View reservation details </a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          This reservation is pending approval.
        </td>
  
      </tr>
      ${getFooter()}
    </table>
  </body>
  `
}

export function textNewReservation({ url }) {
  return `New client reservation submitted at ${process.env.HOSTNAME}. This reservation is pending approval. View the reservation details: ${url} `
}

export function htmlNewProfile(params: { url: string; host: string; origin: string, email: string }) {
  const { url, host, origin } = params
  const newUrl = new URL(url)
  newUrl.searchParams.delete('callbackUrl')
  newUrl.searchParams.set('callbackUrl', "/profile")


  return `
<body style="background: ${color.background}; padding: 10px;">
  ${getHeader({ origin })}


  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 1000px; margin: 10px auto; ">
    <tr>
      <td align="center" style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Please verify your email address using the link below to access your profile.
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
              <a href="${newUrl}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">
                Log in to access your account.
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
    ${getFooter()}
  </table>
</body>
`
}

export function textNewProfile({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}

export function textContactFormSubmission({ url, message, name, email }) {
  return `New contact form submission from ${process.env.HOSTNAME}/contact. Message: ${message}, Name: ${name}, Email: ${email}`;
}

export function htmlContactFormSubmission(params?: {
  url?: string;
  host?: string;
  origin?: string;
  email?: string;
  message?: string;
  name?: string;
}) {
  const { host, origin } = params;
  const escapedHost = host?.replace(/\./g, "&#8203;.");

  return `
  <body style="background: ${color.background}; padding: 10px;">
  
  
    ${getHeader({ origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground
    }; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text
    };">
          New client contact form submitted at <a href="${escapedHost}" style="color: ${color.text
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

export function htmlReservationConfirmedClient(params?: { url?: string; origin?: string }) {
  const { url, origin } = params
  return `
    <body style="background: ${color.background}; padding: 10px;">
      ${getHeader({ origin })}        
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${color.mainBackground}; max-width: 1000px; margin: 10px auto; ">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            Your reservation has been confirmed.
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                    target="_blank"
                    style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;"> View your reservation details </a></td>
              </tr>
            </table>
          </td>
        </tr>        
        ${getFooter()}
      </table>
    </body>
    `
}

export function textReservationConfirmedClient({ url }) {
  return `Thank you for your reservation at ${process.env.HOSTNAME}. Your reservation has been confirmed. View your reservation details: ${url} `
}

const renderData = (data: string) => {
  return Object.keys(data).map(key => {
    return data[key] && `<div style="display:flex;flex-direction:column;margin: 1rem 0;"><span>${INITIAL_QUESTIONNAIRE_FORM_STATE[key].label}</span><span>${data[key]}</span> </div>`
  }).join('')
}

const renderDataTextOnly = (data: string) => {
  return Object.keys(data).map(key => {
    return `${INITIAL_QUESTIONNAIRE_FORM_STATE[key].label} ${data[key]}`
  }).join('\n')
}

export function textQuestionnaire({ url, data }: { data: string, url?: string }) {
  return `A new questionnaire has been submitted from ${process.env.HOSTNAME}.${url
    ? ` View the questionnaire details: ${url}` : ''}: ${renderDataTextOnly(data)}`
}

export function htmlQuestionnaireFormSubmission(params?: { data: string, url?: string; host?: string; origin?: string; email?: string }) {
  const { url, host, origin, data } = params
  const escapedHost = host?.replace(/\./g, "&#8203;.")


  return `
  <body style="background: ${color.background}; padding: 10px;">
  
  
    ${getHeader({ origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          A new questionnaire has been submitted from <a href="${escapedHost}" style="color: ${color.text}; text-decoration: none;">${escapedHost}</a>          
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">   
          <tr>
              <td>
                <p>Questionnaire details:</p>
              </td>
            </tr>         
            <tr>
              <td>
                ${renderData(data)}
              </td>
            </tr>
          </table>
        </td>
      </tr>      
      ${getFooter()}
    </table>
  </body>
  `
}

export function textQuestionnaireClient({ url, data }: { data: string, url?: string }) {
  return `We have received your questionnaire from ${process.env.HOSTNAME}. We will contact you for next steps. ${url ? `View your questionnaire details at ${url}` : ''}: ${renderDataTextOnly(data)} `
}
export function htmlQuestionnaireFormSubmissionClient(params?: { data: string, url?: string; host?: string; origin?: string; email?: string }) {
  const { url, host, origin, data } = params
  const escapedHost = host?.replace(/\./g, "&#8203;.")

  return `
  <body style="background: ${color.background}; padding: 10px;">
  
  
    ${getHeader({ origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 1000px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Thank you for your questionnaire at <a href="${escapedHost}" style="color: ${color.text}; text-decoration: none;">${escapedHost}</a>
        </td>
      </tr>
      
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Your questionnaire is pending review. We will contact you via email for next steps.
        </td>

      </tr>
      <tr>
        <td>
          <p>Questionnaire details submitted:</p>
        </td>
      </tr>
      <tr>
        <td>
          ${renderData(data)}
        </td>
      </tr>
      ${getFooter()}
    </table>
  </body>
  `
}