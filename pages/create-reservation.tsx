import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Content } from "../components/ui-kit/Base";

const Reservation: React.FC = () => {
  const { data: session } = useSession();
  const [fields, setFields] = useState({
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    departureTime: "",
    dateConfirmed: "",
    specialInstructions: "",
  });

  const [guestFields, setGuestFields] = useState({
    email: session?.user?.email || "",
    name: session?.user?.name || "",
  });

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (session?.user) {
      try {
        await fetch("/api/reservation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        }).then((res) => {
          console.log(res, "user is logged in");
        });
        // await Router.push("/draft-reservations");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await fetch("/api/guest-reservation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...guestFields, ...fields }),
        }).then((res) => {
          console.log(res, "user is not logged in");
        });
        // await Router.push("/draft-reservations");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Layout>
      <Content>
        <h1>{!session?.user ? "New Client" : "Client"} Reservation</h1>
        {!session?.user && (
          <>
            <p>
              A $25.00 per run deposit is required for new client reservations.
              Your reservation is not complete and will not be confirmed until
              we receive your deposit and the completed reservation form.
            </p>
            <p>
              You can pay the deposit using debit or credit cards online. The
              deposit will be applied to your pets stay and will reduce your
              total amount due. This deposit is non-refundable but may be
              applied to another reservation upon at least a 24-hour
              cancellation notice.
            </p>
            <p>
              Furthermore, when you submit the deposit payment you atest that
              you have read, understand, and agree to our policies.
            </p>{" "}
            <p>
              <Link href="/api/auth/signin">
                <a>Log in to your account for faster booking</a>
              </Link>
              <span>
                {" "}
                or you may continue to book a reservation as a guest.
              </span>
            </p>
          </>
        )}
        <form onSubmit={submitData}>
          {session ? (
            <>
              <input
                disabled
                placeholder="Email"
                type="text"
                value={session.user.email}
              />
            </>
          ) : (
            <>
              <input
                autoFocus
                onChange={(e) =>
                  setGuestFields({ ...guestFields, email: e.target.value })
                }
                placeholder="Email"
                type="text"
                value={guestFields.email}
              />
              <input
                autoFocus
                onChange={(e) =>
                  setGuestFields({ ...guestFields, name: e.target.value })
                }
                placeholder="Name"
                type="text"
                value={guestFields.name}
              />
            </>
          )}
          <>
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
            <a href="#" onClick={() => Router.push("/")}>
              or Cancel
            </a>
          </>
        </form>
      </Content>
    </Layout>
  );
};

export default Reservation;
