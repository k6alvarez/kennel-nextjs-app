import { LogoOne } from "../components/ui-kit/Logo";
import { ADMINISTRATIVE_FEE } from "./constants";

export const getLogo = () => <LogoOne />;

export const cookiesAgreement = `We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.`;

export const getDepositTotal = () => {
  let depositTotal = Number(ADMINISTRATIVE_FEE);

  return "$" + depositTotal.toFixed(2);
};
