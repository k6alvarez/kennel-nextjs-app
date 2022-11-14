import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Card, Avatar } from "antd";
import React, { useState } from "react";
import { PetProps } from "../../pages/profile";
import {
  petInfoOnly,
  petBoardingOnly,
} from "../Reservations/GuestClients/services";
import { Button } from "../ui-kit/Base";
import { PetInfo } from "./PetInfo";
import { isValidHttpUrl } from "./services";
import { CardTitle } from "./styles";

interface PetCardProps {
  pet: PetProps;
  petSelected: any;
  toggle?: any;
  onDelete?: (petId: string) => void;
  onUpdate?: (petId: string) => void;
}

export const PetCard = ({
  pet,
  toggle,
  onDelete,
  onUpdate,
  petSelected,
}: PetCardProps) => {
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
          {toggle ? (
            <Button
              primary={petSelected}
              type="button"
              onClick={() => toggle(pet)}
            >
              {petSelected ? (
                <>
                  <CheckCircleOutlined /> {pet.name}
                </>
              ) : (
                <>
                  <PlusCircleOutlined /> {pet.name}
                </>
              )}
            </Button>
          ) : (
            <h4>
              <CheckCircleOutlined />
              {pet.name}
            </h4>
          )}
        </CardTitle>
      }
      extra={
        <CardTitle>
          {onDelete && (
            <button
              type="button"
              onClick={() => {
                onDelete(pet.id);
              }}
            >
              <DeleteOutlined /> Remove Pet
            </button>
          )}
          {onUpdate && (
            <button
              type="button"
              onClick={() => {
                onUpdate(pet.id);
              }}
            >
              <DeleteOutlined /> Update Pet
            </button>
          )}
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
