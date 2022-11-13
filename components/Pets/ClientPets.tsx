import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Empty } from "antd";
import React, { useEffect, useState } from "react";
import {
  petBoardingOnly,
  petInfoOnly,
} from "../Reservations/GuestClients/FieldsetPetsInfo";
import { GridItems } from "../ui-kit/Base";
import { PetInfo } from "./PetInfo";
import { isValidHttpUrl } from "./services";

import styled from "styled-components";
const CardTitle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${(props) => props.theme.space[4]};
  margin-bottom: ${(props) => props.theme.space[4]};

  > a {
    font-size: ${(props) => props.theme.fontSizes[0]};
  }

  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

const Wrapper = styled.div`
  padding: ${(props) => props.theme.space[5]};
  background-color: ${(props) => props.theme.colors.secondary};

  .ant-card {
    margin: 0;
  }
`;

const StyledGridItems = styled(GridItems)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

export const ClientPets = ({ pets }) => {
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
    <Wrapper>
      {pets.length === 0 && (
        <Empty description="You don't have any pets yet. Add one below." />
      )}

      <StyledGridItems>
        {pets?.map((pet, i) => (
          <Card
            key={pet + "-" + i}
            style={{ width: "100%" }}
            title={
              <CardTitle>
                {isValidHttpUrl(pet.image) && (
                  <Avatar
                    shape="square"
                    size={80}
                    alt="example"
                    src={pet.image}
                  />
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
            {activeTabKey1 === "boarding" && (
              <PetInfo pet={petBoardingOnly(pet)} />
            )}
          </Card>
        ))}
      </StyledGridItems>
    </Wrapper>
  );
};
