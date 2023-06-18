import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Button, SplitHeader } from "../ui-kit/Base";
import { ClientPets } from "./ClientPets";
import { PetForm } from "./PetForm";
import { getPets } from "./services";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
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
      <SplitHeader>
        My Pets
        <Button primary onClick={() => Router.push("/create-reservation")}>
          Book Reservation
        </Button>
      </SplitHeader>
      <ClientPets pets={pets} />
      <Collapse expandIcon={() => <InfoCircleOutlined />}>
        <Collapse.Panel header={<>Add a pet</>} key="1">
          <PetForm
            formLoading={formLoading}
            setFormLoading={setFormLoading}
            formSuccessCallback={fetchClientPets}
          />
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
