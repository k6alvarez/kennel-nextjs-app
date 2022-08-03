import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Reservation: React.FC = () => {
  const [fields, setFields] = useState({
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    departureTime: "",
    dateConfirmed: "",
    specialInstructions: "",
  });

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      await Router.push("/draft-reservations");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Create New Reservation</h1>
          <input
            autoFocus
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
          <a href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  );
};

export default Reservation;
