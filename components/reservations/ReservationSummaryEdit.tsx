import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import { GuestPet, GuestReservation } from "@prisma/client";
import { Button, App } from "antd";
import Link from "next/link";
import { useContext } from "react";
import { ReservationSummaryContext } from "./ReservationSummary";

export const ReservationSummaryEdit = () => {
  const { message } = App.useApp();
  const { reservation, setReservationData } = useContext(
    ReservationSummaryContext
  );

  const sendReservationConfirmation = async () => {
    if (reservation.confirmed) {
      message.error("Reservation already confirmed");
      return;
    }
    const response = await fetch("/api/reservation/confirm", {
      method: "POST",
      body: JSON.stringify({ id: reservation.id }),
    });
    if (response.ok) {
      message.success("Reservation confirmed");
      setReservationData({ ...reservation, confirmed: true });
    } else {
      message.error("Failed to confirm reservation");
      setReservationData({ ...reservation, confirmed: false });
    }
  };
  return (
    <div className="flex w-full justify-center gap-4 mb-4">
      <Link replace href={`/res-guest/${reservation.id}/edit`}>
        <EditOutlined /> <span className="text-base">Edit Reservation</span>
      </Link>
      <Button
        type="primary"
        className="flex"
        onClick={sendReservationConfirmation}
      >
        <CheckOutlined /> Confirm Reservation
      </Button>
    </div>
  );
};
