import React from "react";
import { useGuestFormContext } from "./formContext";
import { Error } from "./styles";

export const FieldSetPaymentInfo = () => {
  const { formError } = useGuestFormContext();
  return (
    <fieldset>
      <Error>{formError}</Error>
    </fieldset>
  );
};
