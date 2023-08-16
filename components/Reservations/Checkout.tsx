import React, { useEffect } from "react";
import styled from "styled-components";
import { ADMINISTRATIVE_FEE } from "../../utils/constants";

const PaypalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  #paypal-container {
    width: 100%;
    max-width: 300px;
  }
`;

export const PayPalCheckout = ({
  onClick = () => {},
  onConfirm = (results) => console.log("onConfirm fired", results),
  transactionTotal = ADMINISTRATIVE_FEE,
}) => {
  useEffect(() => {
    // @ts-ignore
    if (paypal) {
      // @ts-ignore
      paypal
        .Buttons({
          createOrder: function (data, actions) {
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
      <p>Make a payment using the options below:</p>
      <div id="paypal-container" />
    </PaypalContainer>
  );
};
