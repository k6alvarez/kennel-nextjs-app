import React, { useEffect, useState } from "react";
import { PayPalCheckout } from "../Checkout";
import { useGuestFormContext } from "../formContext";
import { BlockQuote } from "./FormIntro";
import { guestFormUpdate } from "./services";
import { TotalDeposit } from "../styles";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ReservationSummary } from "../ReservationSummary";

export const FieldSetPaymentInfo = () => {
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
        <BlockQuote>
          <InfoCircleOutlined />
          <p>
            A $25.00 per run deposit is required for new client reservations.
            Your reservation is not complete and will not be confirmed until we
            receive your deposit and the completed reservation form.
          </p>
        </BlockQuote>
        <TotalDeposit>Your total deposit due is $25.00</TotalDeposit>
        <ReservationSummary state={guestFormState} />
        <PayPalCheckout
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
              },
            });
          }}
        />
      </>

      {depositConfirmed && (
        <>
          Your deposit was successful. One moment while we save your
          reservation.
        </>
      )}
    </fieldset>
  );
};
