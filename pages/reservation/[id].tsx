import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { Content } from "../../components/ui-kit/Base";

import styled from "styled-components";
import {
  INITIAL_RESERVATION_STATE,
  INITIAL_USER_STATE,
} from "../../components/Reservations/formInitialState";
import { PET_INITIAL_STATE } from "../../components/Pets/petFormReducer";
import { isImageURL, isValidHttpUrl } from "../../components/Pets/services";
import { FileOutlined } from "@ant-design/icons";
import { Divider, Image, List, Tag } from "antd";

import { DateTime } from "luxon";
import { LetterSpacedText } from "../../components/Footer";
import { getDataSource } from "../../components/Reservations/helpers";
import { ReservationNotFound } from "../../components/Reservations/ReservationNotFound";
import { ReservationStatusSection } from "../../components/Reservations/ReservationStatusSection";

export const DetailItem = styled.div`
  margin: ${({ theme }) => theme.space[0]} 0;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
`;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: {
          name: true,
          lastName: true,
          email: true,
          address: true,
          phone: true,
          altPhone: true,
          emergencyContactName: true,
          emergencyContactPhone: true,
          image: true,
        },
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

const Reservation = ({ reservation }) => {
  if (!reservation) {
    return <ReservationNotFound />;
  }

  return (
    <Layout>
      <Content maxWidth="900px">
        <ReservationStatusSection reservation={reservation} />
        <Divider>
          <h2>Reservation Summary</h2>
        </Divider>
        <List
          size="large"
          header={
            <Flex>
              <h2>Reservation Details</h2>
              {reservation.confirmed ? (
                <Tag color="green">Confirmed</Tag>
              ) : (
                <Tag color="red">Not Confirmed</Tag>
              )}
            </Flex>
          }
          bordered
          dataSource={getDataSource(INITIAL_RESERVATION_STATE, reservation)}
          renderItem={(item) => (
            <List.Item className="ant-list-50">{item}</List.Item>
          )}
        />
        <List
          size="large"
          header={
            <Flex>
              <h2>Owner Details</h2>
            </Flex>
          }
          bordered
          dataSource={getDataSource(INITIAL_USER_STATE, reservation.author)}
          renderItem={(item) => (
            <List.Item className="ant-list-50">{item}</List.Item>
          )}
        />
        <Divider>
          <h2>Pets Boarded</h2>
        </Divider>
        {reservation.pets.map((pet) => {
          return (
            <List
              key={pet.id}
              size="large"
              header={
                <Flex>
                  <h2>{pet.name}</h2>
                </Flex>
              }
              bordered
              dataSource={getDataSource(PET_INITIAL_STATE, pet)}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          );
        })}
      </Content>
    </Layout>
  );
};

export default Reservation;
