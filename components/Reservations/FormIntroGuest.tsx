import Link from "next/link";
import React from "react";

export const FormIntroGuest = () => {
  return (
    <div>
      <p>
        A $25.00 per run deposit is required for new client reservations. Your
        reservation is not complete and will not be confirmed until we receive
        your deposit and the completed reservation form.
      </p>
      <p>
        You can pay the deposit using debit or credit cards online. The deposit
        will be applied to your pets stay and will reduce your total amount due.
        This deposit is non-refundable but may be applied to another reservation
        upon at least a 24-hour cancellation notice.
      </p>
      <p>
        Furthermore, when you submit the deposit payment you atest that you have
        read, understand, and agree to our policies.
      </p>{" "}
      <p>
        <Link href="/api/auth/signin">
          <a>Log in to your account for faster booking</a>
        </Link>
        <span> or you may continue to book a reservation as a guest.</span>
      </p>
    </div>
  );
};
