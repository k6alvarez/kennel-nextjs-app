import { CheckOutlined, CloseOutlined, LinkOutlined } from "@ant-design/icons";
import { GuestPet } from "@prisma/client";
import { Button, Card, Modal, Segmented, Switch } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { petDetailsInputs } from "../forms/config/petDetailsInputs";

export const ReservationPet = ({
  pet,
  setPets,
  readOnly,
}: {
  pet: GuestPet;
  setPets: any;
  readOnly?: boolean;
}) => {
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

  const handleRemovePet = () => {
    setPets && setPets((prev: any) => prev.filter((p: any) => p.id !== pet.id));
    setIsModalOpen(false);
  };

  const [activeSement, setActiveSegment] = useState("Pet Info");
  const petDetailGroups = ["Pet Info", "Vaccines", "Boarding"];

  const renderValue = (input: any, pet: any) => {
    const value = String(pet[input.name as keyof typeof pet]);
    const isValueLink = value.includes("http");
    return (
      <p className="text-center flex-col flex">
        {isValueLink ? (
          <a href={value} target="_blank" rel="noreferrer">
            <LinkOutlined /> View {input.label}
          </a>
        ) : (
          <>
            {input.label}:{" "}
            <span className="text-sm font-semibold text-gray-800 text-center break-all">
              {value}
            </span>
          </>
        )}
      </p>
    );
  };

  return (
    <div className="w-3/4 md:w-2/5 lg:w-1/3">
      <Card
        className="w-full h-full"
        key={pet.id}
        cover={
          <img
            alt="example"
            src={
              pet.image ??
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1689110885/gk-app/zjz2lvp4qcppc9bgmfkx.png"
            }
          />
        }
        actions={
          readOnly
            ? []
            : [
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />,
                <Button onClick={showModal} type="link">
                  Edit Pet
                </Button>,
              ]
        }
      >
        <div className="p-4 flex w-full flex-grow bg-secondary">
          <Meta
            title={pet.name}
            description={
              <>
                <Segmented<string>
                  options={petDetailGroups}
                  onChange={(value) => {
                    setActiveSegment(value);
                  }}
                />
                {petDetailGroups.map((group) => (
                  <div key={group}>
                    {group === activeSement &&
                      petDetailsInputs
                        .filter((input) => input.group === group)
                        .map((input) => (
                          <div key={input.name}>{renderValue(input, pet)}</div>
                        ))}
                  </div>
                ))}
              </>
            }
          />
        </div>
      </Card>
      <Modal
        title={<div className="capitalize">Editing {pet.name}</div>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,

          <Button danger onClick={handleRemovePet}>
            Remove Pet
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Save Changes
          </Button>,
        ]}
      >
        <Meta
          title={pet.name}
          description={
            <div className="flex flex-col capitalize">
              <span>
                {pet.age &&
                  `${
                    Number(pet.age) > 1 ? pet.age + " years old" : "1 year old"
                  }`}{" "}
              </span>
              <span className={`${pet.age ? "lowercase" : "capitalize"}`}>
                {pet.breed}
              </span>
            </div>
          }
        />
      </Modal>
    </div>
  );
};
