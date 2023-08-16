import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";
import { ADMINISTRATIVE_FEE } from "../../../utils/constants";

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
    <>
      <p>
        Please note that for new client reservations, we require an
        administrative fee of ${ADMINISTRATIVE_FEE}. You have the convenience of
        paying this fee online using debit or credit cards.
      </p>
      <BlockQuote>
        This non-refundable fee is for setting up your record and does not
        guarantee your reservation.
      </BlockQuote>
      <p>
        Additionally, by submitting the deposit payment, you are acknowledging
        that you have read, understood, and agreed to our{" "}
        <Link href="/policies">
          <a>policies</a>
        </Link>
        .
      </p>
    </>
  );
};
