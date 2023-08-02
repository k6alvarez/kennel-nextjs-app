import React, { useEffect, useState } from "react";
import Router from "next/router";
import styled from "styled-components";
import { Button, SplitHeader } from "../ui-kit/Base";
import { getReservations } from "./services";
import { VirtualTable } from "../ui-kit/Table/VirtualTable";
import { Tag, message } from "antd";
import { DateTime } from "luxon";
import { headerHt } from "../ui-kit/Promo/styles-promo";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 0;
  }
`;

const TableWrapper = styled.div`
  .ant-table {
    border: 1px solid #e8e8e8;
    p {
      margin: 0;
    }
  }
`;

export const ReservationsTab = () => {
  const [reservations, setReservations] = useState([]);

  const fetchClientReservations = async () => {
    try {
      const reservationsData = await getReservations();
      const formattedReservations = reservationsData.map((reservation) => ({
        ...reservation,
        key: reservation.id,
      }));
      setReservations(formattedReservations);
    } catch (error) {
      message.error("Something went wrong. Refresh the page and try again.");
    }
  };

  useEffect(() => {
    fetchClientReservations();
  }, []);
  return (
    <>
      <SplitHeader>
        <h1>My Reservations</h1>
        <Button
          primary
          onClick={() => Router.push("/create-reservation")}
          small
        >
          Book Reservation
        </Button>
      </SplitHeader>

      <TableWrapper>
        {reservations.length > 0 ? (
          <VirtualTable
            scroll={{
              y: window.innerHeight - parseInt(headerHt) - 235,
            }}
            columns={[
              {
                title: "Status",
                dataIndex: "confirmed",
                key: "confirmed",
                render: (confirmed) => {
                  return (
                    <Flex>
                      {confirmed ? (
                        <Tag color="green">Confirmed</Tag>
                      ) : (
                        <Tag color="red">Pending</Tag>
                      )}
                    </Flex>
                  );
                },
              },
              {
                title: "Reservation Dates",
                dataIndex: "arrivalDate",
                key: "arrivalDate",
                render: (arrivalDate, item) => {
                  return (
                    <span>
                      {DateTime.fromISO(arrivalDate).toLocaleString(
                        DateTime.DATE_MED
                      )}{" "}
                      -{" "}
                      {DateTime.fromISO(item.departureDate).toLocaleString(
                        DateTime.DATE_MED
                      )}
                    </span>
                  );
                },
              },
              {
                title: "Pets",
                dataIndex: "pets",
                key: "pets",
                render: (pets) =>
                  pets.map((pet, i) => (
                    <span key={`pet-${i}`}>
                      {i === pets.length - 1 ? pet.name : `${pet.name}, `}
                    </span>
                  )),
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
                render: (email, item) => {
                  const emailAddressValue = email || item.author.email;
                  return <p>{emailAddressValue}</p>;
                },
              },
            ]}
            dataSource={reservations}
          />
        ) : (
          <>
            <p>You have no reservations.</p>
            <bl>
              Please note that for new client reservations, we require an
              administrative fee of $25.00. You have the convenience of paying
              this fee online using debit or credit cards.
            </bl>
          </>
        )}
      </TableWrapper>
    </>
  );
};
