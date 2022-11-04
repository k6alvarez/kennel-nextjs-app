import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { Content } from "../../components/ui-kit/Base";
import Card from "antd/lib/card/Card";
import styled from "styled-components";
import {
  INITIAL_RESERVATION_STATE,
  INITIAL_USER_STATE,
} from "../../components/Reservations/formInitialState";
import { PET_INITIAL_STATE } from "../../components/Pets/petFormReducer";
import { isValidHttpUrl } from "../../components/Pets/services";
import { FileOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Image from "next/image";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
`;

const ResId = styled.span`
  font-size: ${({ theme }) => `calc(${theme.fontSizes[0]}/1.4)`};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const reservation = await prisma.guestReservation.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
      pets: true,
    },
  });
  return {
    props: {
      reservation: JSON.parse(JSON.stringify(reservation)),
    },
  };
};

const ResGuest = ({ reservation }) => {
  const getFieldGroupValues = (
    fieldGroup: {
      [x: string]: any;
    },
    key: string,
    value: string | boolean | Date
  ) => {
    const fieldInGroup = fieldGroup[key];

    if (key === "image" || key === "name") {
      return;
    }

    if (fieldInGroup && value) {
      const isUrl = isValidHttpUrl(value);
      return (
        <div key={key}>
          <p>
            {fieldInGroup.label}: <br />
            {isUrl ? (
              <a href={value as string} target="_blank" rel="noreferrer">
                <FileOutlined /> {fieldInGroup.label}
              </a>
            ) : (
              <span>{value}</span>
            )}
          </p>
        </div>
      );
    }
  };

  if (!reservation) {
    return (
      <Layout>
        <Content>
          <h1>Reservation not found</h1>
          <p>
            It looks like this reservation does not exist. Check the link sent
            to the email address provided when the reservation was submitted.
          </p>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content maxWidth="900px">
        <h1>Boarding Reservation for {reservation.arrivalDate}</h1>
        <p>
          Your reservation details are below. We have also emailed you a link to
          this page.
        </p>
      </Content>
      <Content maxWidth="900px" cardWrapper fs="0">
        <Card
          title={
            <Flex>
              <span>Boarding Dates</span>
              <ResId>Reservation ID: {reservation.id}</ResId>
            </Flex>
          }
        >
          <Grid>
            {Object.entries(reservation).map(([key, value]: any) =>
              getFieldGroupValues(INITIAL_RESERVATION_STATE, key, value)
            )}
          </Grid>
        </Card>
        {reservation.pets.map((pet) => {
          return (
            <Card title={pet.name} key={pet.id}>
              <Image
                src={pet.image}
                alt={`Picture of ${pet.name}`}
                width={200}
                height={200}
              />
              <Grid>
                {Object.entries(pet).map(([key, value]: any) =>
                  getFieldGroupValues(PET_INITIAL_STATE, key, value)
                )}
              </Grid>
            </Card>
          );
        })}

        <Card title={"Owner Details"}>
          <Grid>
            {Object.entries(reservation).map(([key, value]: any) =>
              getFieldGroupValues(INITIAL_USER_STATE, key, value)
            )}
          </Grid>
        </Card>
      </Content>
    </Layout>
  );
};

export default ResGuest;
