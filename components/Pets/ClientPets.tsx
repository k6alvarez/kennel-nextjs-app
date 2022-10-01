import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import { getPets } from "./services";

export const ClientPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getPets().then((pets) => setPets(pets));
  }, []);
  return (
    <>
      {!pets.length && (
        <Empty description="You don't have any pets yet. Add one below." />
      )}

      {pets?.map((pet, i) => (
        <p key={pet + "-" + i}>{pet.name}</p>
      ))}
    </>
  );
};
