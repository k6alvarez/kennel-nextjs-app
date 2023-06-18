import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Card, Avatar, Badge, Button as AntButton, Modal, message } from "antd";
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
  min-width: 33%;

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
  const [activePet, setCurrentPet] = useState<PetProps>(pet);

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
    if (vaccinationsExpired(activePet)) {
      setActiveTabKey1("vaccines");
    }
  }, [activePet]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (data) => {
    setIsModalOpen(false);
    setCurrentPet(data);
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
                  onClick={() => {
                    toggle(activePet);
                  }}
                >
                  {petSelected ? (
                    <>
                      <CheckCircleOutlined /> {activePet.name}
                    </>
                  ) : (
                    <>
                      <PlusCircleOutlined /> {activePet.name}
                    </>
                  )}
                </Button>
              ) : (
                <span>{activePet.name}</span>
              )}
            </div>
            <div>
              {vaccinationsExpired(activePet) && (
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
              title={<CardTitle>Edit {activePet.name}</CardTitle>}
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              width={"1000px"}
            >
              <UserPetEditForm pet={activePet} callback={handleOk} />
            </Modal>
          </>
        }
      >
        {activeTabKey1 === "pet" && <PetInfo pet={petInfoOnly(activePet)} />}
        {activeTabKey1 === "vaccines" && (
          <PetInfo pet={vaccinationInfoOnly(activePet)} />
        )}
        {activeTabKey1 === "boarding" && (
          <PetInfo pet={boardingInfoOnly(activePet)} />
        )}
      </Card>
    </Container>
  );
};
