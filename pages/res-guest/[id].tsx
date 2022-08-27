import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { Content } from "../../components/ui-kit/Base";
import { GuestReservation } from "@prisma/client";
import Card from "antd/lib/card/Card";
import styled from "styled-components";
import {
  INITIAL_PETS_STATE,
  INITIAL_RESERVATION_STATE,
  INITIAL_USER_STATE,
} from "../../components/Reservations/NewClients/formInitialState";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
`;

const ResId = styled.span`
  font-size: ${({ theme }) => `calc(${theme.fontSizes[0]}/1.8)`};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

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
    },
  });
  return {
    props: {
      reservation: JSON.parse(JSON.stringify(reservation)),
    },
  };
};

export type GuestReservationProps = {
  id: string;
  reservation: Partial<GuestReservation>;
};

const ResGuest: React.FC<GuestReservationProps> = ({ reservation }) => {
  const getFieldGroupValues = (
    fieldGroup: {
      [x: string]: any;
      petOneName?: {
        value: string;
        error: any;
        type: string;
        label: string;
        required: boolean;
      };
      petOneType?: {
        value: string;
        error: any;
        type: string;
        options: string[];
        label: string;
        required: boolean;
      };
      petOneBreed?: {
        value: string;
        error: any;
        type: string;
        label: string;
        required: boolean;
      };
      petOneGender?: {
        value: string;
        error: any;
        type: string;
        options: string[];
        label: string;
        required: boolean;
      };
      petOneFixed?: {
        value: string;
        error: any;
        type: string;
        options: string[];
        label: string;
        required: boolean;
      };
      petOneColor?: {
        value: string;
        error: any;
        type: string;
        label: string;
        required: boolean;
      };
      petOneImage?: { value: string; error: any; type: string; label: string };
      petOneLargeImage?: {
        value: string;
        error: any;
        type: string;
        label: string;
      };
      petOneVaccinations?: {
        value: string;
        error: any;
        type: string;
        label: string;
        required: boolean;
      };
      petOneVaccinationsLargeImage?: {
        value: string;
        error: any;
        type: string;
        label: string;
      };
      petOneAge?: {
        value: string;
        error: any;
        type: string;
        label: string;
        required: boolean;
      };
      petOneWeight?: {
        value: string;
        error: any;
        type: string;
        label: string;
        required: boolean;
      };
      petOneVet?: {
        value: string;
        error: any;
        type: string;
        label: string;
        required: boolean;
      };
      petOnePreferredRunSize?: {
        value: string;
        error: any;
        type: string;
        options: string[];
        label: string;
        required: boolean;
      };
      petOneFeeding?: {
        value: string;
        error: any;
        type: string;
        label: string;
        required: boolean;
      };
      petOneFeedingCount?: {
        value: string;
        error: any;
        type: string;
        label: string;
        required: boolean;
      };
    },
    key: string,
    value: string | boolean | Date
  ) => {
    const fieldInGroup = fieldGroup[key];
    if (fieldInGroup && value) {
      return (
        <div key={key}>
          <p>
            {fieldInGroup.label}:<br />
            {value}
          </p>
        </div>
      );
    }
  };
  return (
    <Layout>
      <Content>
        <h1>Boarding Reservation for {reservation.arrivalDate}</h1>
        <p>
          Your reservation details are below. We have also emailed you a link to
          this page.
        </p>
      </Content>
      <Content cardWrapper>
        <Card
          title={
            <Flex>
              <span>Reservation for {reservation.petOneName}</span>
              <ResId>
                Reservation ID: <br />
                {reservation.id}
              </ResId>
            </Flex>
          }
          cover={
            (reservation.petOneLargeImage || reservation.petOneImage) && (
              <img
                alt={`Photo of ${reservation.petOneName}`}
                src={reservation.petOneLargeImage || reservation.petOneImage}
              />
            )
          }
        >
          <Grid>
            {Object.entries(reservation).map(([key, value]) => {
              if (!key.includes("Image")) {
                return getFieldGroupValues(INITIAL_PETS_STATE, key, value);
              }
            })}
          </Grid>
        </Card>
        <Card title={"Boarding Dates"}>
          <Grid>
            {Object.entries(reservation).map(([key, value]) =>
              getFieldGroupValues(INITIAL_RESERVATION_STATE, key, value)
            )}
          </Grid>
        </Card>

        <Card title={"Owner Details"}>
          <Grid>
            {Object.entries(reservation).map(([key, value]) =>
              getFieldGroupValues(INITIAL_USER_STATE, key, value)
            )}
          </Grid>
        </Card>
      </Content>
    </Layout>
  );
};

export default ResGuest;
