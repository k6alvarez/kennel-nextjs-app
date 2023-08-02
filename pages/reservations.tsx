import React, { useEffect, useState } from "react";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";

import Layout from "../components/Layout";

import { getSession, useSession } from "next-auth/react";
import { Content } from "../components/ui-kit/Base";

import { Button, Divider, Tabs, Tag, Tooltip, message } from "antd";
import { VirtualTable } from "../components/ui-kit/Table/VirtualTable";
import { headerHt } from "../components/ui-kit/Promo/styles-promo";
import styled from "styled-components";
import { DateTime } from "luxon";
import Link from "next/link";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  padding: 0 20px;
  margin-top: ${headerHt}px;
  margin-bottom: 20px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 0;
  }
`;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { reservations: [], guestReservations: [], user: null } };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const reservations = await prisma.reservation.findMany({
    include: {
      author: true,
      pets: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const guestReservations = await prisma.guestReservation.findMany({
    include: {
      pets: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      reservations: JSON.parse(JSON.stringify(reservations)),
      guestReservations: JSON.parse(JSON.stringify(guestReservations)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export const reservations = ({ reservations, guestReservations, user }) => {
  const router = useRouter();
  const { tab } = router.query;
  const [activeKey, setActiveKey] = useState("reservations");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const dataUsers = reservations.map((reservation, index) => {
    return {
      key: reservation.id,
      id: reservation.id,
      reservationType: "user",
      confirmed: reservation.confirmed ? "confirmed" : "not confirmed",
      arrivalDate: reservation.arrivalDate,
      departureDate: reservation.departureDate,
      createdAt: reservation.createdAt,
      name: reservation.author.name,
      lastName: reservation.author.lastName,
      email: reservation.author.email,
      pets: reservation.pets,
    };
  });

  const [dataUsersKeyOnly, setDataUsersKeyOnly] = useState(dataUsers);

  const dataGuestsKeyOnly = guestReservations.map((reservation, index) => {
    return {
      key: reservation.id,
      id: reservation.id,
      reservationType: "guest",
      arrivalDate: reservation.arrivalDate,
      departureDate: reservation.departureDate,
      createdAt: reservation.createdAt,
      confirmed: reservation.confirmed ? "confirmed" : "not confirmed",
      name: reservation.name,
      lastName: reservation.lastName,
      email: reservation.email,
      pets: reservation.pets,
    };
  });

  const columnsUsers = [
    {
      title: "Status",
      dataIndex: "confirmed",
      key: "confirmed",
      render: (confirmed) => (
        <Flex>
          <Tag color={confirmed === "confirmed" ? "green" : "red"}>
            {confirmed}
          </Tag>
        </Flex>
      ),
    },
    {
      title: "Reservation Dates",
      dataIndex: "arrivalDate",
      key: "arrivalDate",
      render: (arrivalDate, item) => {
        return (
          <span>
            <ArrowRightOutlined />
            {DateTime.fromISO(arrivalDate).toLocaleString(DateTime.DATE_FULL)}
            <br />
            <ArrowLeftOutlined />
            {DateTime.fromISO(item.departureDate).toLocaleString(
              DateTime.DATE_FULL
            )}
          </span>
        );
      },
    },
    {
      title: "Owner Name & Pets",
      dataIndex: "name",
      key: "name",
      render: (name, item) => (
        <span>
          {name} {item.lastName}
          <br />
          <Tooltip
            title={item.pets.map((pet, i) => {
              return pet.name + (i < item.pets.length - 1 ? ", " : "");
            })}
          >
            {item.pets.length} Pets
          </Tooltip>
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actions, item) => (
        <>
          <Button
            type="primary"
            size="small"
            icon={<CheckOutlined />}
            loading={loading}
            disabled={item.confirmed === "confirmed"}
            onClick={() => {
              setLoading(true);
              const updateReservation = async () => {
                const reservationApiName =
                  item.reservationType === "user"
                    ? "reservation"
                    : "guest-reservation";
                const response = await fetch(
                  `/api/${reservationApiName}/${item.id}`,
                  {
                    method: "PUT",
                    body: JSON.stringify({
                      id: item.id,
                      confirmed: true,
                      userId: item.userId,
                      reservationEmail: item.email,
                    }),
                  }
                );

                // update state to re-render table
                const newData = dataUsersKeyOnly.map((data) => {
                  if (data.id === item.id) {
                    return { ...data, confirmed: "confirmed" };
                  }
                  return data;
                });
                setDataUsersKeyOnly(newData);

                if (response.ok) {
                  message.success("Reservation confirmed");
                } else {
                  message.error("Something went wrong. Please try again.");
                }
                setLoading(false);
              };
              updateReservation();
            }}
          >
            Confirm
          </Button>
          <Divider type="vertical" />
          <Link
            href={`/${
              item.reservationType === "user" ? "reservation" : "res-guest"
            }/${item.id}`}
          >
            <Button icon={<EyeOutlined />} size="small">
              View
            </Button>
          </Link>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (tab) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveKey(tab as string);
    }
  }, [tab]);

  if (!session) {
    return (
      <Layout>
        <Content>
          <h1>Acess Denied</h1>
          <div>You need to be authenticated to view this page.</div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Wrapper>
        {user?.permissions?.includes("ADMIN") ? (
          <main>
            <Content
              style={{
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <h1>Reservations</h1>
            </Content>
            <Tabs
              defaultActiveKey="reservations"
              activeKey={activeKey}
              items={[
                {
                  key: "reservations",
                  label: "User Reservations",
                  children: (
                    <>
                      <VirtualTable
                        columns={columnsUsers}
                        dataSource={dataUsersKeyOnly}
                        scroll={{
                          y: window.innerHeight - parseInt(headerHt) - 100,
                        }}
                      />
                    </>
                  ),
                },
                {
                  key: "guest-reservations",
                  label: "Guest Reservations",
                  children: (
                    <>
                      <VirtualTable
                        columns={columnsUsers}
                        dataSource={dataGuestsKeyOnly}
                        scroll={{
                          y: window.innerHeight - parseInt(headerHt) - 200,
                        }}
                      />
                    </>
                  ),
                },
              ]}
              onTabClick={(key) => {
                router.replace(`/reservations?tab=${key}`, undefined, {
                  shallow: true,
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </main>
        ) : (
          <div>You need to be authenticated to view this page.</div>
        )}
      </Wrapper>
    </Layout>
  );
};

export default reservations;
