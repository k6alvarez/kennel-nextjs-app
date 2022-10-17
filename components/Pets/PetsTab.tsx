import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import { ClientPets } from "./ClientPets";
import { PetForm } from "./PetForm";
import { getPets } from "./services";
export const PetsTab = () => {
  return (
    <>
      <h1>My Pets</h1>
      <ClientPets />
      <h1>Add New Pet</h1>
      <PetForm formSuccessCallback={getPets} />
    </>
  );
};
