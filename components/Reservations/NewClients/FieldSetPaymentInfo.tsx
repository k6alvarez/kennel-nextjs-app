import React, { useEffect, useState } from "react";
import { PayPalCheckout } from "../Checkout";
import { useGuestFormContext } from "./formContext";
import { BlockQuote } from "./FormIntro";
import { submitData } from "./services";
import { Error, TotalDeposit } from "./styles";

export const FieldSetPaymentInfo = () => {
  const { formError, dispatch, state, setFormError } = useGuestFormContext();
  const [depositConfirmed, setDepositConfirmed] = useState(false);

  useEffect(() => {
    if (depositConfirmed && state.depositStatus === "COMPLETED") {
      submitData(undefined, { state, setFormError, dispatch });
    }
  }),
    [state];

  return (
    <fieldset>
      <Error>{formError}</Error>
      <>
        <BlockQuote>
          A $25.00 per run deposit is required for new client reservations. Your
          reservation is not complete and will not be confirmed until we receive
          your deposit and the completed reservation form.
        </BlockQuote>
        <TotalDeposit>Your total deposit due is $25.00</TotalDeposit>
        <PayPalCheckout
          onConfirm={(results) => {
            setDepositConfirmed(true);
            dispatch({
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
