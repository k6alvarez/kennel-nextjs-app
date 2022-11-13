import { DeleteOutlined } from "@ant-design/icons";
import { Card, Avatar } from "antd";
import React, { useState } from "react";
import {
  petInfoOnly,
  petBoardingOnly,
} from "../Reservations/GuestClients/FieldsetPetsInfo";
import { PetInfo } from "./PetInfo";
import { isValidHttpUrl } from "./services";
import { CardTitle } from "./styles";

export const PetCard = ({ pet }) => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>("pet");

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  const tabList = [
    {
      key: "pet",
      tab: "Pet Info",
    },
    {
      key: "boarding",
      tab: "Boarding Info",
    },
  ];
  return (
    <Card
      title={
        <CardTitle>
          {isValidHttpUrl(pet.image) && (
            <Avatar shape="square" size={80} alt="example" src={pet.image} />
          )}
          <h4>{pet.name}</h4>
        </CardTitle>
      }
      extra={
        <CardTitle>
          <a href="#">
            <DeleteOutlined /> Delete Pet
          </a>
          <a href="#">
            <DeleteOutlined /> Update Pet
          </a>
        </CardTitle>
      }
      tabList={tabList}
      activeTabKey={activeTabKey1}
      onTabChange={(key) => {
        onTab1Change(key);
      }}
    >
      {activeTabKey1 === "pet" && <PetInfo pet={petInfoOnly(pet)} />}
      {activeTabKey1 === "boarding" && <PetInfo pet={petBoardingOnly(pet)} />}
    </Card>
  );
};
