import React from "react";
import { useClientFormContext } from "../formContext";
import { Button } from "../../ui-kit/Base";
import { createReservationDraft } from "../services";

export const SubmitReservationButton = ({ current }) => {
  const {
    clientFormState,
    clientFormDispatch,
    setClientFormError,
    clientFormLoading,
    setClientFormLoading,
  } = useClientFormContext();
  return (
    <>
      {current === 3 && (
        <Button
          type="button"
          primary
          onClick={() => {
            setClientFormLoading(true);
            createReservationDraft(undefined, {
              state: clientFormState,
              setFormError: setClientFormError,
              dispatch: clientFormDispatch,
              apiPath: "/api/reservation",
            }).then(() => {
              setClientFormLoading(false);
            });
          }}
          disabled={clientFormLoading}
        >
          Submit Reservation
        </Button>
      )}
    </>
  );
};
