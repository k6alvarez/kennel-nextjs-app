import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Card, Badge, Button as AntButton, Modal } from "antd";
import React, { useState } from "react";
import { PetProps } from "../../pages/profile";
import {
  boardingInfoOnly,
  petInfoOnly,
  vaccinationInfoOnly,
} from "../Reservations/GuestClients/services";
import { Button } from "../ui-kit/Base";
import { PetInfo } from "./PetInfo";
import { CardTitle } from "./styles";

import styled from "styled-components";
import { DateTime } from "luxon";
import { UserPetEditForm } from "../Reservations/UserPetEditForm";
import { useGuestFormContext } from "../Reservations/formContext";

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
  refetchPets?: () => void;
  apiPath?: string;
  setPets?: React.Dispatch<React.SetStateAction<PetProps[]>>;
}

export const PetCard = ({
  pet,
  toggle,
  onDelete,
  onUpdate,
  petSelected,
  refetchPets,
  apiPath,
  setPets,
}: PetCardProps) => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>("pet");
  const { guestFormDispatch, setGuestFormError } = useGuestFormContext();

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (data) => {
    setIsModalOpen(false);
    //logged in clients
    refetchPets && refetchPets();

    //guest clients
    if (setPets) {
      setPets((prev) =>
        prev.map((pet) => {
          if (pet.id === data.id) {
            return data;
          }
          return pet;
        })
      );

      guestFormDispatch({
        type: "togglePet",
        payload: {
          pet: data,
        },
      });

      setGuestFormError(null);
    }
  };

  return (
    <Container>
      <Card
        title={
          <CardTitle>
            {toggle ? (
              <Button
                primary={petSelected}
                type="button"
                onClick={() => {
                  toggle(pet);
                }}
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
              <span>{pet.name}</span>
            )}
            {vaccinationsExpired(pet) && <Badge count="Vaccinations Expired" />}
          </CardTitle>
        }
        extra={
          <CardTitle>
            {onDelete && (
              <AntButton
                size="small"
                onClick={() => {
                  onDelete(pet.id);
                }}
              >
                Remove Pet
              </AntButton>
            )}
            {onUpdate && (
              <AntButton
                size="small"
                onClick={() => {
                  onUpdate(pet.id);
                }}
              >
                Update Pet
              </AntButton>
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
            <AntButton size="small" type="primary" onClick={showModal}>
              Edit Pet
            </AntButton>
            <Modal
              title={<CardTitle>Edit {pet.name}</CardTitle>}
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              width={"1000px"}
            >
              <UserPetEditForm
                apiPath={apiPath}
                pet={pet}
                callback={handleOk}
              />
            </Modal>
          </>
        }
      >
        {activeTabKey1 === "pet" && <PetInfo pet={petInfoOnly(pet)} />}
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
