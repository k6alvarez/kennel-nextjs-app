import Link from "next/link";
import React from "react";
import styled from "styled-components";

export const BlockQuote = styled.blockquote`
  font-size: ${(props) => props.theme.fontSizes[0]};
  margin-left: 1rem;
  margin-top: ${(props) => props.theme.space[4]};
  margin-bottom: ${(props) => props.theme.space[4]};
  position: relative;
  font-weight: 600;

  &::before {
    content: "";
    background: ${({ theme }) => theme.colors.primary};
    width: 3px;
    height: 100%;
    left: -1rem;
    position: absolute;
  }
`;

export const FormIntroGuest = () => {
  return (
    <div>
      <BlockQuote>
        A $25.00 per run deposit is required for new client reservations. Your
        reservation is not complete and will not be confirmed until we receive
        your deposit and the completed reservation form.
      </BlockQuote>
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
          <a>Login to your account</a>
        </Link>
        <span> or you may continue to book a reservation as a guest.</span>
      </p>
    </div>
  );
};
