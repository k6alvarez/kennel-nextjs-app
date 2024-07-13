/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export const text = ({ url, host }: { url: string; host: string }) => {
  return `Sign in to ${host}\n${url}\n\n`;
};
