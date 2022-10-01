import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { Content } from "../../components/ui-kit/Base";
import { GuestReservation } from "@prisma/client";
import Card from "antd/lib/card/Card";
import styled from "styled-components";
import {
  INITIAL_RESERVATION_STATE,
  INITIAL_USER_STATE,
} from "../../components/Reservations/formInitialState";
import {
  INITIAL_PETS_STATE,
  PET_FIVE_INITIAL_STATE,
  PET_FOUR_INITIAL_STATE,
  PET_ONE_INITIAL_STATE,
  PET_THREE_INITIAL_STATE,
  PET_TWO_INITIAL_STATE,
} from "../../components/Reservations/formInitialStatePets";

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
      <Content maxWidth="900px">
        <h1>Boarding Reservation for {reservation.arrivalDate}</h1>
        <p>
          Your reservation details are below. We have also emailed you a link to
          this page.
        </p>
      </Content>
      <Content maxWidth="900px" cardWrapper>
        <Card
          title={
            <Flex>
              <span>Boarding Dates</span>
              <ResId>
                Reservation ID: <br />
                {reservation.id}
              </ResId>
            </Flex>
          }
        >
          <Grid>
            {Object.entries(reservation).map(([key, value]) =>
              getFieldGroupValues(INITIAL_RESERVATION_STATE, key, value)
            )}
          </Grid>
        </Card>
        {reservation.petOneName && (
          <Card title={reservation.petOneName}>
            <Grid>
              {Object.entries(PET_ONE_INITIAL_STATE).map(([key, _value], i) => {
                return getFieldGroupValues(
                  PET_ONE_INITIAL_STATE,
                  key,
                  reservation[key]
                );
              })}
            </Grid>
          </Card>
        )}
        {reservation.petTwoName && (
          <Card title={reservation.petTwoName}>
            <Grid>
              {Object.entries(PET_TWO_INITIAL_STATE).map(([key, _value], i) => {
                return getFieldGroupValues(
                  PET_TWO_INITIAL_STATE,
                  key,
                  reservation[key]
                );
              })}
            </Grid>
          </Card>
        )}
        {reservation.petThreeName && (
          <Card title={reservation.petThreeName}>
            <Grid>
              {Object.entries(PET_THREE_INITIAL_STATE).map(
                ([key, _value], i) => {
                  return getFieldGroupValues(
                    PET_THREE_INITIAL_STATE,
                    key,
                    reservation[key]
                  );
                }
              )}
            </Grid>
          </Card>
        )}
        {reservation.petFourName && (
          <Card title={reservation.petFourName}>
            <Grid>
              {Object.entries(PET_FOUR_INITIAL_STATE).map(
                ([key, _value], i) => {
                  return getFieldGroupValues(
                    PET_FOUR_INITIAL_STATE,
                    key,
                    reservation[key]
                  );
                }
              )}
            </Grid>
          </Card>
        )}
        {reservation.petFiveName && (
          <Card title={reservation.petFiveName}>
            <Grid>
              {Object.entries(PET_FIVE_INITIAL_STATE).map(
                ([key, _value], i) => {
                  return getFieldGroupValues(
                    PET_FIVE_INITIAL_STATE,
                    key,
                    reservation[key]
                  );
                }
              )}
            </Grid>
          </Card>
        )}

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
