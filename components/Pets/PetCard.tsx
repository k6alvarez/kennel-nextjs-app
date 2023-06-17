import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditFilled,
  PlusCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Avatar, Badge, Button as AntButton, Modal } from "antd";
import React, { useEffect, useState } from "react";
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
import { DateTime } from "luxon";
import { UserPetEditForm } from "../Forms/UserPetEditForm";

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

const vaccinationsExpired = (pet: PetProps) => {
  const isParvoExpired = DateTime.fromISO(pet.parvoVirusesVaccine).diffNow();
  const isDistemperExpired = DateTime.fromISO(pet.distemperVaccine).diffNow();
  const isBordetellaExpired = DateTime.fromISO(pet.bordetellaVaccine).diffNow();
  const isRabiesExpired = DateTime.fromISO(pet.rabiesVaccine).diffNow();

  return (
    isParvoExpired.milliseconds < 0 ||
    isDistemperExpired.milliseconds < 0 ||
    isBordetellaExpired.milliseconds < 0 ||
    isRabiesExpired.milliseconds < 0
  );
};

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

  useEffect(() => {
    if (vaccinationsExpired(pet)) {
      setActiveTabKey1("vaccines");
    }
  }, [pet]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Card
        title={
          <CardTitle>
            <div>
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
                <p>{pet.name}</p>
              )}
            </div>
            <div>
              {vaccinationsExpired(pet) && (
                <Badge count="Vaccinations Expired" />
              )}
            </div>
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
        tabBarExtraContent={
          <>
            <AntButton type="primary" onClick={showModal}>
              Edit Pet
            </AntButton>
            <Modal
              title={<CardTitle>Edit {pet.name}</CardTitle>}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <UserPetEditForm pet={pet} />
            </Modal>
          </>
        }
      >
        {activeTabKey1 === "pet" && (
          <PetInfo pet={petInfoOnly(pet)}>
            {isValidHttpUrl(pet.image) && (
              <Avatar shape="square" size={150} alt="example" src={pet.image} />
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
    </Container>
  );
};
