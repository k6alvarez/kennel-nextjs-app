import React, { useEffect, useState } from "react";
import { PayPalCheckout } from "../Checkout";
import { useGuestFormContext } from "../formContext";
import { BlockQuote } from "./FormIntro";
import { guestFormSubmitReservationRequest } from "./services";
import { TotalDeposit } from "../styles";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { ReservationSummary } from "../ReservationSummary";
import { Checkbox } from "antd";
import { ADMINISTRATIVE_FEE } from "../../../utils/constants";
import {
  cookiesAgreement,
  getDepositTotal,
} from "../../../utils/renderHelpers";

export const FieldSetPaymentInfo = ({ pets }) => {
  const {
    guestFormDispatch,
    guestFormState,
    setGuestFormError,
    guestFormError,
  } = useGuestFormContext();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [depositConfirmed, setDepositConfirmed] = useState(false);
  const [shouldCreateUser, setShouldCreateUser] = useState(false);

  const handleSubmit = async () => {
    await guestFormSubmitReservationRequest(undefined, {
      state: guestFormState,
      setFormError: setGuestFormError,
      dispatch: guestFormDispatch,
      shouldCreateUser,
    });
  };

  useEffect(() => {
    if (depositConfirmed && guestFormState.depositStatus === "COMPLETED") {
      handleSubmit()
        .then((res) => {
          console.log("handleSubmit res", res);
        })
        .catch((err) => {
          console.log("handleSubmit err", err);
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
              <span>Your total due is {getDepositTotal()}</span>
            </TotalDeposit>
            <Checkbox
              style={{ margin: "0 auto" }}
              onChange={(e) => setShouldCreateUser(e.target.checked)}
              checked={shouldCreateUser}
            >
              Create a profile to avoid this fee for future bookings.
            </Checkbox>
            {!depositConfirmed && (
              <PayPalCheckout
                transactionTotal={ADMINISTRATIVE_FEE}
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
                  setPaymentInfo(results);
                }}
              />
            )}
          </div>
        </BlockQuote>
      </>
      {!guestFormError && depositConfirmed && (
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
