import { DateTime } from "luxon";
import React from "react";

export const ReservationStatusSection = ({ reservation }) => {
  return (
    <>
      <h1>
        <span>
          Boarding Reservation for{" "}
          {DateTime.fromISO(reservation.arrivalDate).toLocaleString({
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </span>
      </h1>
      <p>
        {reservation.confirmed ? (
          <>Your reservation has been confirmed.</>
        ) : (
          <>
            Your reservation is not confirmed until you have received a
            confirmation email from us.
          </>
        )}
      </p>
    </>
  );
};
