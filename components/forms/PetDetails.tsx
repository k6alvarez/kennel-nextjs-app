import { Alert, message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useEffect, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { Form } from "./Form";
import { handleGuestPet } from "@/app/actions/handleGuestPet";
import { GuestPet, GuestReservation } from "@prisma/client";
import { petDetailsInputs } from "./config/petDetailsInputs";
import Link from "next/link";

export const PetDetails = ({
  reservation,
  pets,
  setPets,
}: {
  reservation: GuestReservation;
  pets: GuestPet[];
  setPets: React.Dispatch<React.SetStateAction<GuestPet[]>>;
}) => {
  const { pending } = useFormStatus();
  let initialState = null;

  const [state, formAction] = useFormState(handleGuestPet, initialState);
  const [errorCause, setErrorCause] = useState(null);
  useEffect(() => {
    if (state && state) {
      const newPet = state;
      setPets([...pets, newPet]);
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
            message={
              <>
                If you provide food please package each meal in a *Ziploc®
                (type) plastic bag (no fold-over sandwich baggies, please) with
                each meal clearly labeled with your pet's name. See our{" "}
                <Link href={"/policies?tab=feeding"}>feeding policy</Link> for
                more details.
              </>
            }
            type="info"
            showIcon
          />
        )}
      </div>
      <Form
        formAction={formAction}
        inputs={petDetailsInputs}
        loading={pending}
        defaultInputValues={{
          ...state,
          reservationId: reservation.id,
        }}
        btnWrapperClasses="col-span-2 flex justify-center"
        renderBtnText={(loading: boolean) =>
          loading ? "Saving..." : "Add Pet"
        }
      />
    </>
  );
};
