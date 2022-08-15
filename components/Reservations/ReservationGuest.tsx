import React, { useState } from "react";
import Router from "next/router";
import { FormIntroGuest } from "./FormIntroGuest";

export const ReservationGuest = () => {
  const [fields, setFields] = useState({
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    departureTime: "",
    dateConfirmed: "",
    specialInstructions: "",
    email: "",
    name: "",
  });

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/guest-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      }).then((res) => {
        console.log(res);
      });
      // await Router.push("/draft-guest-reservations");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormIntroGuest />
      <form onSubmit={submitData}>
        <fieldset>
          <input
            autoFocus
            onChange={(e) => setFields({ ...fields, email: e.target.value })}
            placeholder="Email"
            type="text"
            value={fields.email}
          />
          <input
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
            placeholder="Name"
            type="text"
            value={fields.name}
          />
          <input
            onChange={(e) =>
              setFields({ ...fields, arrivalDate: e.target.value })
            }
            placeholder="Arrival Date"
            type="text"
            value={fields.arrivalDate}
          />
          <input
            onChange={(e) =>
              setFields({ ...fields, arrivalTime: e.target.value })
            }
            placeholder="Arrival Time"
            type="text"
            value={fields.arrivalTime}
          />
          <input
            onChange={(e) =>
              setFields({ ...fields, departureDate: e.target.value })
            }
            placeholder="Departure Date"
            type="text"
            value={fields.departureDate}
          />
          <input
            onChange={(e) =>
              setFields({ ...fields, departureTime: e.target.value })
            }
            placeholder="Departure Time"
            type="text"
            value={fields.departureTime}
          />
          <input
            onChange={(e) =>
              setFields({ ...fields, dateConfirmed: e.target.value })
            }
            placeholder="Date Confirmed"
            type="text"
            value={fields.dateConfirmed}
          />

          <textarea
            cols={50}
            onChange={(e) =>
              setFields({ ...fields, specialInstructions: e.target.value })
            }
            placeholder="Special Instructions"
            rows={8}
            value={fields.specialInstructions}
          />
          <input type="submit" value="Create" />
        </fieldset>
        <a href="#" onClick={() => Router.push("/")}>
          or Cancel
        </a>
      </form>
    </>
  );
};
