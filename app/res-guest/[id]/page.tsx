import prisma from "@/lib/prisma";
import { Content } from "@/components/ui/Content";
import React from "react";
import { auth } from "@/auth";
import { Button, Divider, Flex, List, Tag } from "antd";
import { User } from "@prisma/client";
import {
  CheckOutlined,
  WarningOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import { ReservationStatusSection } from "@/components/reservations/ReservationStatusSection";
import { ReservationSummary } from "@/components/reservations/ReservationSummary";

type GuestReservationPageProps = {
  params: {
    id: string;
  };
};

// export const generateMetadata = async ({
//   params,
// }: {
//   params: { id: string };
// }) => {
//   try {
//     let post = await prisma?.post.findUnique({
//       where: { id: params.id },
//       include: { author: true },
//     });
//     let data = post || {
//       title: "Post",
//       slogan: "View post details",
//     };

//     return {
//       title: `${data.title}`,
//       description: `View post details`,
//     };
//   } catch (e) {
//     return {
//       title: `Post`,
//       description: `View post details`,
//     };
//   }
// };

const GuestReservationPage: React.FC<GuestReservationPageProps> = async ({
  params,
}: {
  params: { id: string };
}) => {
  const session = await auth();
  const isAdmin = (session?.user as User)?.permissions.includes("ADMIN");
  const guestReservation = await prisma?.guestReservation.findUnique({
    where: { id: params.id },
    include: {
      pets: true,
    },
  });
  if (!guestReservation) {
    return <Content>Reservation not found</Content>;
  }

  //   const postDate = (date: Date) =>
  //     new Date(date).toLocaleString("en-US", {
  //       month: "long",
  //       day: "numeric",
  //       year: "numeric",
  //     });
  return (
    <Content>
      <ReservationSummary reservation={guestReservation} isAdmin={isAdmin} />
      {/* {useWelcome && (
        <BlockQuote>
          <>
            <p>
              Thanks for signing up! Next time you make a reservation,
              <a href="/auth/signin"> log in</a> using the email address you
              provided to set up your profile.
            </p>
          </>
        </BlockQuote>
      )} */}

      {/* {!editMode ? (
        <>
          <List
            size="large"
            header={
              <Flex>
                <h2>Reservation Details </h2>
                <Flex>
                  {user?.permissions?.includes("ADMIN") && (
                    <HideForPrintWrapper>
                      <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        loading={loading}
                        disabled={
                          reservationState.confirmed ||
                          reservationState.cancelled
                        }
                        onClick={() => {
                          setLoading(true);
                          confirmReservation().then(() => {
                            setReservationState({
                              ...reservationState,
                              confirmed: true,
                            });
                          });
                        }}
                      >
                        Confirm
                      </Button>
                    </HideForPrintWrapper>
                  )}
                  
                </Flex>
              </Flex>
            }
            bordered
            dataSource={getDataSource(
              { ...INITIAL_RESERVATION_STATE },
              reservationState
            )}
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
            dataSource={getDataSource(INITIAL_USER_STATE, reservationState)}
            renderItem={(item) => (
              <List.Item className="ant-list-50">{item}</List.Item>
            )}
          />
          <Divider>
            <h2>Pets Boarded</h2>
          </Divider>
          {reservationState.pets.map((pet, i) => {
            return (
              <List
                key={pet.id}
                size="large"
                header={
                  <Flex>
                    <h2>{pet.name}</h2>
                    <Flex>
                      {pet.medicationInstructions && (
                        <Tag
                          style={{
                            fontSize: "1rem",
                            padding: "0.25rem 1rem",
                          }}
                          icon={<AlertOutlined />}
                          color="blue"
                        >
                          Medication Required
                        </Tag>
                      )}
                    </Flex>
                  </Flex>
                }
                className={i === 1 || i === 4 ? "page-break-always-print" : ""}
                bordered
                dataSource={getDataSource(PET_INITIAL_STATE, pet)}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            );
          })}
        </>
      ) : (
        <ReservationSummaryForm
          isGuest={true}
          reservation={reservationState}
          formSuccessCallback={(res) => {
            setReservationState({
              ...reservationState,
              ...res,
            });
          }}
        />
        
      )} */}
    </Content>
  );
};

export default GuestReservationPage;
