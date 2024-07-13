import { handleNewClientReservation } from "@/app/actions/handleNewClientReservation";
import { Alert, message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useEffect, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { Form } from "./Form";
import { boardingDetailsInputs } from "./config/boardingDetailsInputs";

export const BoardingDetails = ({
  reservation,
  setReservation,
  next,
  prev,
  current,
}: {
  reservation: any;
  setReservation: any;
  current: number;
  next: () => void;
  prev: () => void;
}) => {
  const { pending } = useFormStatus();
  let initialState = reservation;
  const [errorCause, setErrorCause] = useState(null);
  const [state, formAction] = useFormState(
    handleNewClientReservation,
    initialState
  );
  useEffect(() => {
    if (state && state.reservation) {
      setReservation(state.reservation);
      next();
    }
    if (state && state.statusMessage?.message) {
      message.open({
        type: state.statusMessage.type as NoticeType,
        content: state.statusMessage.message,
      });

      if (state.statusMessage.type === "error") {
        setErrorCause(state.statusMessage.cause);
      }
    }
  }, [state && state.statusMessage]);
  return (
    <>
      <div className="flex flex-col gap-8 justify-center items-center mb-4">
        {errorCause ? (
          <Alert
            className="w-full max-w-max "
            message={errorCause}
            type="error"
            showIcon
          />
        ) : (
          <Alert
            className="w-full max-w-max "
            message="Resevations are by appointment. Please arrive at your scheduled time."
            type="info"
            showIcon
          />
        )}
      </div>
      <Form
        formAction={formAction}
        inputs={boardingDetailsInputs}
        loading={pending}
        defaultInputValues={state}
        renderBtnText={(loading: boolean) => (loading ? "Saving..." : "Next")}
        renderCancelBtnText={() => "Previous"}
        onCanceled={() => {
          prev();
        }}
      />
    </>
  );
};
