import { Collapse, Button, Alert } from "antd";
import { PetDetails } from "../forms/PetDetails";
import { ReservationPet } from "./ReservationPet";
import { GuestReservation } from "@prisma/client";

type Props = {
  pets: any[];
  setPets: any;
  reservation: GuestReservation | null;
  setReservation: any;
  next: any;
  prev: any;
};
export const ReservationPets = ({
  pets,
  setPets,
  reservation,
  setReservation,
  next,
  prev,
}: Props) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mb-4">
        <Alert
          className="w-full max-w-max "
          message="The uploaded vaccination records must match the selected expiration dates else your reservation cannot be confirmed. Additionally, the uploaded vaccination records must be from a licensed veterinarian and must include the pet's name, the veterinarian's name, and the date of the vaccination."
          type="info"
          showIcon
        />
      </div>

      {pets.length > 0 && (
        <div className="flex flex-wrap justify-center my-6 gap-6">
          {pets.map((pet, _i) => (
            <ReservationPet key={pet.id} pet={pet} setPets={setPets} />
          ))}
        </div>
      )}

      <div className="flex flex-col justify-center">
        <Collapse
          items={[
            {
              key: "1",
              label: "Add New Pet to Reservation",
              children: (
                <PetDetails
                  reservation={reservation}
                  pets={pets}
                  setPets={setPets}
                />
              ),
            },
          ]}
          defaultActiveKey={pets.length === 0 ? ["1"] : []}
          onChange={(key: string | string[]) => console.log(key)}
        />
      </div>

      <div className="flex justify-center md:justify-end mt-4">
        <Button
          htmlType="button"
          style={{ margin: "0 8px" }}
          onClick={() => prev()}
        >
          Previous
        </Button>
        {pets.length > 0 && (
          <Button htmlType="button" type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
      </div>
    </>
  );
};
