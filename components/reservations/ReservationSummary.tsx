"use client";
import { GuestPet, GuestReservation } from "@prisma/client";
import { Divider, Tag } from "antd";
import React, { createContext } from "react";
import { ReservationDataGroup } from "./ReservationDataGroup";
import { getReservationDetails } from "./listDataSources";
import {
  WarningOutlined,
  CheckOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import { DateTime } from "luxon";
import { ReservationPet } from "./ReservationPet";
import { ReservationSummaryEdit } from "./ReservationSummaryEdit";
import { ReservationStatusSection } from "./ReservationStatusSection";
import { PetsCardList } from "../pets/PetsCardList";

export interface ReservationSummaryProps {
  isAdmin?: boolean;
  reservation: GuestReservation & { pets: GuestPet[] };
  setReservationData?: (data: GuestReservation & { pets: GuestPet[] }) => void;
}

export const ReservationSummaryContext = createContext<any>(undefined);

export const ReservationSummary = ({
  reservation,
  isAdmin = false,
}: ReservationSummaryProps) => {
  const [reservationData, setReservationData] = React.useState(reservation);
  const detailsDataSource = [
    {
      label: "Arrival Date",
      value: DateTime.fromISO(reservation.arrivalDate).toLocaleString(
        DateTime.DATE_FULL
      ),
    },
    {
      label: "Arrival Time",
      value: DateTime.fromISO(reservation.arrivalTime).toLocaleString(
        DateTime.TIME_SIMPLE
      ),
    },
    {
      label: "Departure Date",
      value: DateTime.fromISO(reservation.departureDate).toLocaleString(
        DateTime.DATE_FULL
      ),
    },
    {
      label: "Departure Time",
      value: DateTime.fromISO(reservation.departureTime).toLocaleString(
        DateTime.TIME_SIMPLE
      ),
    },
    {
      label: "Special Instructions",
      value: reservation.specialInstructions || "None",
    },
    {
      label: "How Did You Hear About Us?",
      value: reservation.howHear || "N/A",
    },
  ];
  const ownerDataSource = [
    {
      label: "First Name",
      value: `${reservation.name}`,
    },
    {
      label: "Last Name",
      value: reservation.lastName,
    },
    {
      label: "Email",
      value: reservation.email,
    },
    {
      label: "Phone",
      value: reservation.phone,
    },
    {
      label: "Address",
      value: reservation.address,
    },
    {
      label: "Unit/Apt/Suite",
      value: reservation.unit || "N/A",
    },
    {
      label: "City",
      value: reservation.city,
    },
    {
      label: "State",
      value: reservation.state,
    },
    {
      label: "Zip",
      value: reservation.zip,
    },
    {
      label: "Alternate Phone",
      value: reservation.altPhone || "N/A",
    },
    {
      label: "Emergency Contact Name",
      value: reservation.emergencyContactName,
    },
    {
      label: "Emergency Contact Phone",
      value: reservation.emergencyContactPhone,
    },
  ];
  return (
    <ReservationSummaryContext.Provider
      value={{
        reservation: reservationData,
        setReservationData,
      }}
    >
      <ReservationStatusSection reservation={reservationData} />
      <div className="flex flex-col gap-4">
        <Divider>
          <div className="flex justify-between items-center w-full gap-4">
            {reservationData.cancelled ? (
              <Tag
                style={{
                  fontSize: "1rem",
                  padding: "0.25rem 1rem",
                }}
                icon={<WarningOutlined />}
                color="orange"
              >
                Cancelled
              </Tag>
            ) : (
              <>
                {reservationData.confirmed ? (
                  <Tag
                    style={{
                      fontSize: "1rem",
                      padding: "0.25rem 1rem",
                    }}
                    color="green"
                  >
                    <CheckOutlined /> Confirmed
                  </Tag>
                ) : (
                  <Tag
                    style={{
                      fontSize: "1rem",
                      padding: "0.25rem 1rem",
                    }}
                    color="red"
                  >
                    <AlertOutlined /> Pending Confirmation
                  </Tag>
                )}
              </>
            )}
          </div>
        </Divider>
        {isAdmin && <ReservationSummaryEdit />}
        <ReservationDataGroup
          header={<h2 className="text-center">Reservation Details</h2>}
          reservation={reservationData}
          dataSource={getReservationDetails(detailsDataSource)}
        />
        <ReservationDataGroup
          header={<h2 className="text-center">Owner Information</h2>}
          reservation={reservationData}
          dataSource={getReservationDetails(ownerDataSource)}
        />
        <Divider>
          <h2>Pets Boarded</h2>
        </Divider>
        <PetsCardList reservationData={reservationData} isAdmin={isAdmin} />
      </div>
    </ReservationSummaryContext.Provider>
  );
};
