import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { GridItems } from "../ui-kit/Base";
import { getPets, isValidHttpUrl } from "./services";

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

      <GridItems>
        {pets?.map((pet, i) => (
          <Card
            key={pet + "-" + i}
            style={{ width: 300 }}
            cover={
              isValidHttpUrl(pet.largeImage) && (
                <img alt="example" src={pet.largeImage} />
              )
            }
            // actions={[
            //   <SettingOutlined key="setting" />,
            //   <EditOutlined key="edit" />,
            //   <EllipsisOutlined key="ellipsis" />,
            // ]}
          >
            <Card.Meta
              // avatar={
              //   isValidHttpUrl(pet.image) ? (
              //     <Avatar src={pet.image} />
              //   ) : (
              //     <Avatar>{pet.name[0]}</Avatar>
              //   )
              // }
              title={pet.name}
              description={`${pet.age} year old ${pet.breed} `}
            />
          </Card>
        ))}
      </GridItems>
    </>
  );
};
