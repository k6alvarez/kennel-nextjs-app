import { GuestPet, GuestReservation } from "@prisma/client";
import { ReservationPet } from "../reservations/ReservationPet";

type Props = {
  reservationData: GuestReservation & { pets: GuestPet[] };
  isAdmin?: boolean;
};
export const PetsCardList = ({ reservationData, isAdmin = false }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {reservationData.pets.length > 0 &&
        reservationData.pets.map((pet) => (
          <ReservationPet
            key={pet.id}
            pet={pet}
            setPets={undefined}
            readOnly={!isAdmin}
          />
        ))}
    </div>
  );
};
