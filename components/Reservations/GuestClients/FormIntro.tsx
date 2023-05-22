import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";

export const blockquoteStyles = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-size: ${({ theme, large }) =>
    large ? theme.fontSizes[2] : theme.fontSizes[1]};
  line-height: 1.6;
  margin-top: ${(props) => props.theme.space[4]};
  margin-bottom: ${(props) => props.theme.space[4]};
  position: relative;

  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colors.secondaryDark};
  box-shadow: ${({ theme }) => theme.shadows.light};

  &::before {
    content: "";
    background: ${({ theme }) => theme.colors.primary};
    width: 3px;
    height: 100%;
    left: 0;
    position: absolute;
  }

  p {
    margin: ${(props) => props.theme.space[4]};
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes[6]};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const BlockQuote = styled.blockquote``;

export const FormIntroGuest = () => {
  return (
    <div>
      <p>
        A $25.00 per run deposit is required for new client reservations. You
        can pay the deposit using debit or credit cards online. The deposit will
        be applied to your pets stay and will reduce your total amount due. This
        deposit is non-refundable but may be applied to another reservation upon
        at least a 24-hour cancellation notice.
      </p>
      <p>
        Furthermore, when you submit the deposit payment you atest that you have
        read, understand, and agree to our{" "}
        <Link href="/policies">
          <a>policies</a>
        </Link>
        .
      </p>

      <p>
        <Link href="/api/auth/signin">
          <a>Create an online profile</a>
        </Link>
        <span> or continue to book your reservation as a new client.</span>
      </p>
    </div>
  );
};
