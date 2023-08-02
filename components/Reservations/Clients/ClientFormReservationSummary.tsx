import React, { useEffect, useState } from "react";
import { ReservationSummary } from "../ReservationSummary";
import { Checkbox, message } from "antd";
import pets from "../../../pages/api/pets";
import { PayPalCheckout } from "../Checkout";
import { BlockQuote } from "../GuestClients/FormIntro";
import { TotalDeposit } from "../styles";
import { createReservationDraft, getReservations } from "../services";
import { useClientFormContext } from "../formContext";
import { Field } from "../../Forms/styles";

const getDepositTotal = () => {
  let depositTotal = 25;

  return "$" + depositTotal.toFixed(2);
};

export const ClientFormReservationSummary = ({
  depositRequired,
  setDepositRequired,
}) => {
  const [depositConfirmed, setDepositConfirmed] = useState(false);
  const {
    clientFormState,
    clientFormDispatch,
    setClientFormError,
    setClientFormLoading,
  } = useClientFormContext();

  const fetchClientReservations = async () => {
    try {
      const reservationsData = await getReservations();
      return reservationsData.length > 0;
    } catch (error) {
      message.error("Something went wrong. Refresh the page and try again.");
    }
  };

  useEffect(() => {
    fetchClientReservations().then((doesClientHaveReservations) => {
      if (doesClientHaveReservations) {
        setDepositRequired(false);
      }
    });
  }, []);

  return (
    <>
      <ReservationSummary state={clientFormState} pets={clientFormState.pets} />
      {depositRequired && (
        <BlockQuote>
          <div>
            <p>
              As a new client, there is a one-time boarding fee of $25 to cover
              administrative costs.
            </p>
            <p>
              You have the convenience of paying this fee online using debit or
              credit cards. This non-refundable fee is for setting up your
              record and does not guarantee your reservation.
            </p>
            <p>
              If you are an existing user, you will not be charged a deposit but
              your reservation will not be confirmed until we verify your
              information.
            </p>
            <Checkbox
              style={{ margin: "0 auto" }}
              onChange={(e) => setDepositRequired((prev) => !prev)}
            >
              Select if you are an existing client.
            </Checkbox>
            <TotalDeposit>
              <span>Your total due is {getDepositTotal()}</span>
            </TotalDeposit>

            <PayPalCheckout
              transactionTotal="25.00"
              onConfirm={(results) => {
                setDepositConfirmed(true);
                createReservationDraft(undefined, {
                  state: {
                    ...clientFormState,
                    depositStatus: results.status,
                    depositAmount: results.purchase_units[0].amount.value,
                    depositDate: results.create_time,
                    depositId: results.id,
                    depositLink: results.links[0].href,
                  },
                  setFormError: setClientFormError,
                  dispatch: clientFormDispatch,
                  apiPath: "/api/reservation",
                }).then(() => {
                  setClientFormLoading(false);
                });
              }}
            />
          </div>
        </BlockQuote>
      )}
    </>
  );
};
