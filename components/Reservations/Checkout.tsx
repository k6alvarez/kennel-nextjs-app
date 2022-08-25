import React, { useEffect } from "react";
import styled from "styled-components";

const PaypalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div:first-child {
    width: 100%;
    max-width: 300px;
  }
`;

export const PayPalCheckout = ({
  onClick = () => {},
  onConfirm = (results) => console.log("onConfirm fired", results),
  transactionTotal = "25.00",
}) => {
  useEffect(() => {
    if (paypal) {
      paypal
        .Buttons({
          createOrder: function (data, actions) {
            // This function sets up the details of the transaction, including the amount and line item details.
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: transactionTotal,
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              onConfirm(details);
            });
          },
          onClick,
        })
        .render("#paypal-container");
    }
  }, []);
  return (
    <PaypalContainer>
      <div id="paypal-container" />
    </PaypalContainer>
  );
};
