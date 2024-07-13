"use client";
import { Form } from "../forms/Form";
import { useFormState, useFormStatus } from "react-dom";
import { App, Divider } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { GuestPet, GuestReservation } from "@prisma/client";
import { ownerDetailsInputs } from "./config/ownerDetailsInputs";
import { editReservation } from "@/app/actions/editReservation";
import { boardingDetailsInputs } from "./config/boardingDetailsInputs";
import { petDetailsInputs } from "./config/petDetailsInputs";
import { ReservationPet } from "../reservations/ReservationPet";
import { PetsCardList } from "../pets/PetsCardList";

let initialState = {
  id: "",
  statusMessage: {
    message: "",
    type: "info",
  },
};

export const EditReservation: React.FC<{
  reservation: GuestReservation & { pets: GuestPet[] };
}> = ({ reservation }) => {
  const { message } = App.useApp();
  const { pending } = useFormStatus();
  initialState.id = reservation.id;

  const [state, formAction] = useFormState(editReservation, initialState);

  useEffect(() => {
    if (state && state.statusMessage.message) {
      message.open({
        type: state.statusMessage.type as NoticeType,
        content: state.statusMessage.message,
      });

      if (state.statusMessage.redirect) {
        redirect(state.statusMessage.redirect);
      }
    }
  }, [state && state.statusMessage]);

  return (
    <>
      <Form
        formAction={formAction}
        inputs={[...ownerDetailsInputs, ...boardingDetailsInputs]}
        loading={pending}
        defaultInputValues={reservation}
      />
      <Divider>
        <h2>Pets Boarded</h2>
      </Divider>
      <PetsCardList reservationData={reservation} />
    </>
  );
};
