"use client";
import { useState } from "react";
import { Steps } from "antd";
import { OwnerDetails } from "./OwnerDetails";
import { BoardingDetails } from "./BoardingDetails";
import { GuestPet, GuestReservation } from "@prisma/client";
import { ReservationPets } from "../reservations/ReservationPets";
import Summary from "./Summary";

export const ReservationForm = () => {
  const [reservation, setReservation] = useState<GuestReservation | null>(null);
  const [pets, setPets] = useState<GuestPet[]>([]);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    if (current === 0) {
      return;
    }
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Owner",
      content: (
        <OwnerDetails
          next={next}
          prev={prev}
          current={current}
          reservation={reservation}
          setReservation={setReservation}
        />
      ),
    },
    {
      title: "Boarding",
      content: (
        <BoardingDetails
          next={next}
          prev={prev}
          current={current}
          reservation={reservation}
          setReservation={setReservation}
        />
      ),
    },
    {
      title: "Pets",
      content: (
        <ReservationPets
          next={next}
          prev={prev}
          pets={pets}
          setPets={setPets}
          reservation={reservation}
          setReservation={setReservation}
        />
      ),
    },
    {
      title: "Summary",
      content: (
        <Summary
          reservation={reservation}
          pets={pets}
          setPets={setPets}
          prev={prev}
          setReservation={setReservation}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps current={current} items={items} />
      <div className="bg-gray-100 p-4 rounded-md my-6">
        {steps[current].content}
      </div>
    </>
  );
};
