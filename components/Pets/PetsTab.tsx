import React, { useEffect, useState } from "react";
import { ClientPets } from "./ClientPets";
import { PetForm } from "./PetForm";
import { getPets } from "./services";
export const PetsTab = () => {
  const [pets, setPets] = useState([]);
  const [formLoading, setFormLoading] = useState(false);

  const fetchClientPets = async () => {
    const pets = await getPets();
    setPets(pets);
  };

  useEffect(() => {
    fetchClientPets();
  }, []);
  return (
    <>
      <h1>My Pets</h1>
      <ClientPets pets={pets} />
      <h1>Add New Pet</h1>
      <PetForm
        formLoading={formLoading}
        setFormLoading={setFormLoading}
        formSuccessCallback={fetchClientPets}
      />
    </>
  );
};
