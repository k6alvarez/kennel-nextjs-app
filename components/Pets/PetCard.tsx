import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Card, Avatar, Image } from "antd";
import React, { useState } from "react";
import { PetProps } from "../../pages/profile";
import {
  boardingInfoOnly,
  petInfoOnly,
  vaccinationInfoOnly,
} from "../Reservations/GuestClients/services";
import { Button } from "../ui-kit/Base";
import { PetInfo } from "./PetInfo";
import { isValidHttpUrl } from "./services";
import { CardTitle } from "./styles";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  flex: 1;

  > button {
    flex: 1;
    font-size: ${(props) => props.theme.fontSizes[4]};

    margin: 0;

    .ant-avatar-string {
      font-size: ${(props) => props.theme.fontSizes[4]};
      text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    }
  }
`;

const StyledBanner = styled.p`
  position: absolute;
  margin: 0;
  z-index: 1;
  top: 0%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -0%);
  background-color: ${({ primary, hasImage }) =>
    primary && hasImage
      ? `rgba(70, 8, 31, 1);`
      : hasImage
      ? `rgba(0, 0, 0, 0.5);`
      : `rgba(0, 0, 0, 0.5);`};
  color: ${(props) => props.theme.colors.textPrimary};
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  text-transform: capitalize;
`;

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
      key: "vaccines",
      tab: "Vaccines",
    },
    {
      key: "boarding",
      tab: "Boarding",
    },
  ];

  return (
    <Container>
      {/* {toggle ? (
        <Button primary={petSelected} type="button" onClick={() => toggle(pet)}>
          {petSelected ? (
            <StyledBanner primary hasImage={isValidHttpUrl(pet.image)}>
              <CheckCircleOutlined rev={undefined} /> {pet.name}
            </StyledBanner>
          ) : (
            <StyledBanner>
              <PlusCircleOutlined rev={undefined} /> {pet.name}
            </StyledBanner>
          )}
          {isValidHttpUrl(pet.image) ? (
            <Image
              src={
                isValidHttpUrl(pet.image)
                  ? pet.image
                  : "/images/ShieldOutline.png"
              }
              alt={pet.name}
              preview={false}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Avatar size={100}>
              {pet.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
          )}
        </Button>
      ) : (
        <h4>
          <CheckCircleOutlined rev={undefined} />
          {pet.name}
        </h4>
      )} */}
      <>
        <Card
          title={
            <CardTitle>
              {toggle ? (
                <Button
                  primary={petSelected}
                  type="button"
                  onClick={() => toggle(pet)}
                >
                  {petSelected ? (
                    <>
                      <CheckCircleOutlined rev={undefined} /> {pet.name}
                    </>
                  ) : (
                    <>
                      <PlusCircleOutlined rev={undefined} /> {pet.name}
                    </>
                  )}
                </Button>
              ) : (
                <h4>
                  <CheckCircleOutlined rev={undefined} />
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
                  <DeleteOutlined rev={undefined} /> Remove Pet
                </button>
              )}
              {onUpdate && (
                <button
                  type="button"
                  onClick={() => {
                    onUpdate(pet.id);
                  }}
                >
                  <DeleteOutlined rev={undefined} /> Update Pet
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
          {activeTabKey1 === "pet" && (
            <PetInfo pet={petInfoOnly(pet)}>
              {isValidHttpUrl(pet.image) && (
                <Avatar
                  shape="square"
                  size={150}
                  alt="example"
                  src={pet.image}
                />
              )}
            </PetInfo>
          )}
          {activeTabKey1 === "vaccines" && (
            <PetInfo pet={vaccinationInfoOnly(pet)} />
          )}
          {activeTabKey1 === "boarding" && (
            <PetInfo pet={boardingInfoOnly(pet)} />
          )}
        </Card>
      </>
    </Container>
  );
};
