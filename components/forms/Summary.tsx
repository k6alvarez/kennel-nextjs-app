import { GuestPet, GuestReservation } from "@prisma/client";
import { ReservationPet } from "../reservations/ReservationPet";
import { Button, message } from "antd";
import { sendGuestReservationRequest } from "@/app/actions/sendGuestReservationRequest";
import { useEffect } from "react";

const Summary = ({
  pets,
  reservation,
  setReservation,
  setPets,
  prev,
}: {
  pets: GuestPet[];
  reservation: GuestReservation | null;
  setReservation: React.Dispatch<React.SetStateAction<GuestReservation | null>>;
  setPets: React.Dispatch<React.SetStateAction<GuestPet[]>>;
  prev: () => void;
}) => {
  useEffect(() => {
    console.log("🚀 ~ reservation:", reservation);
  }, [reservation]);

  return (
    <>
      <div className="mt-6">
        <h1 className="mb-4">Reservation Summary</h1>
        {reservation && (
          <div className="flex flex-col gap-4">
            <div>
              <h2>Owner</h2>
              <p>Name: {reservation.name}</p>
              <p>Email: {reservation.email}</p>
              <p>Phone: {reservation.phone}</p>
              <p>Submitted: {reservation.submitted ? "Yes" : "No"} </p>
            </div>
            <div>
              <h2>Boarding</h2>
              <p>
                Check-in: {reservation.arrivalDate} @ {reservation.arrivalTime}
              </p>
              <p>
                Check-out: {reservation.departureDate} @{" "}
                {reservation.departureTime}
              </p>
            </div>
          </div>
        )}
        <h2>Pets</h2>
        {pets.length > 0 && (
          <div className="flex flex-wrap justify-center my-6 gap-6">
            {pets.map((pet, _i) => (
              <ReservationPet
                key={pet.id}
                pet={pet}
                setPets={setPets}
                readOnly
              />
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            htmlType="button"
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            Previous
          </Button>
          <Button
            type="primary"
            onClick={() =>
              reservation &&
              sendGuestReservationRequest(reservation).then((res) => {
                const { reservation, statusMessage } = res;
                if (statusMessage) {
                  // message[statusMessage.type](statusMessage.message);
                }
                if (reservation) {
                  setReservation(reservation);
                }
              })
            }
          >
            Submit Reservation Request
          </Button>
        </div>
      </div>
    </>
  );
};

export default Summary;
