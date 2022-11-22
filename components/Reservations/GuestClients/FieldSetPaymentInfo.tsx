import React, { useEffect, useState } from "react";
import { PayPalCheckout } from "../Checkout";
import { useGuestFormContext } from "../formContext";
import { BlockQuote } from "./FormIntro";
import { guestFormUpdate } from "./services";
import { TotalDeposit } from "../styles";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ReservationSummary } from "../ReservationSummary";

const getDepositTotal = (pets) => {
  let depositTotal = 0;
  pets.map((pet) => {
    if (pet.preferredRunSize === "Small") {
      return (depositTotal += 25);
    } else if (pet.preferredRunSize === "Large") {
      return (depositTotal += 25);
    } else if (pet.preferredRunSize === "Extra Large") {
      return (depositTotal += 25);
    }
  });

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
              A $25.00 per run deposit is required for new client reservations.
              Your reservation is not complete and will not be confirmed until
              we receive your deposit and the completed reservation form.
            </p>
            <TotalDeposit>
              <p>Your total deposit due is {getDepositTotal(pets)}</p>
            </TotalDeposit>
          </div>
        </BlockQuote>
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
