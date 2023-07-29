import React, { useEffect, useState } from "react";
import { PayPalCheckout } from "../Checkout";
import { useGuestFormContext } from "../formContext";
import { BlockQuote } from "./FormIntro";
import { guestFormUpdate } from "./services";
import { TotalDeposit } from "../styles";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { ReservationSummary } from "../ReservationSummary";

const getDepositTotal = () => {
  let depositTotal = 25;

  return "$" + depositTotal.toFixed(2);
};

export const FieldSetPaymentInfo = ({ pets }) => {
  const { guestFormDispatch, guestFormState, setGuestFormError } =
    useGuestFormContext();
  const [depositConfirmed, setDepositConfirmed] = useState(false);

  useEffect(() => {
    if (depositConfirmed && guestFormState.depositStatus === "COMPLETED") {
      guestFormUpdate(undefined, {
        state: guestFormState,
        setFormError: setGuestFormError,
        dispatch: guestFormDispatch,
      });
    }
  }, [guestFormState]);

  return (
    <fieldset>
      <>
        <ReservationSummary state={guestFormState} pets={pets} />

        <BlockQuote>
          <div>
            <p>
              As a new client, there is a one-time boarding fee of $25 to cover
              administrative costs. However, if you create a profile, you can
              avoid this fee for future bookings. Your information will be
              securely saved and you can update it at any time.
            </p>
            <p>
              You have the convenience of paying this fee online using debit or
              credit cards. This non-refundable fee is for setting up your
              record and does not guarantee your reservation.
            </p>
            <TotalDeposit>
              <p>Your total due is {getDepositTotal()}</p>
            </TotalDeposit>
          </div>
        </BlockQuote>
        <p></p>
        <PayPalCheckout
          transactionTotal="25.00"
          onConfirm={(results) => {
            setDepositConfirmed(true);

            guestFormDispatch({
              type: "depositConfirmed",
              payload: {
                depositStatus: results.status,
                depositAmount: results.purchase_units[0].amount.value,
                depositDate: results.create_time,
                depositId: results.id,
                depositLink: results.links[0].href,
                id: guestFormState.reservationId,
                pets,
              },
            });
          }}
        />
      </>

      {depositConfirmed && (
        <>
          <p>
            <Loading3QuartersOutlined spin /> Your deposit was successful. One
            moment while we save your reservation.
          </p>
        </>
      )}
    </fieldset>
  );
};
