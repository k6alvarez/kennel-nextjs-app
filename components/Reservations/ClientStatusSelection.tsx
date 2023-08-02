import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { EditForm } from "../Forms/styles";
import { Tiptap } from "../ui-kit/Tiptap";
import { ThemePreferenceContext } from "../../pages/_app";
import { saveContent } from "../Admin/services";
import { Content } from "../ui-kit/Base";

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.f || "column"};

  align-items: center;
  justify-content: center;

  gap: ${({ theme }) => theme.space[6]};

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    flex-direction: ${(props) => props.f || "row"};
  }

  button,
  a {
    font-size: ${({ theme }) => `calc(${theme.fontSizes[4]})`};
    text-align: center;
    padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[6]};
    margin: 0 auto;
    box-shadow: ${({ theme }) => theme.shadows.default};
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
    color: ${({ theme }) => theme.colors.textPrimary};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-shadow: none;
    transition: all 0.1s ease-in-out;

    span {
      font-size: ${({ theme }) => `calc(${theme.fontSizes[5]})`};
    }

    p {
      color: ${({ theme }) => theme.colors.white};
    }

    &[data-active="true"],
    :hover {
      transform: scale(1.08);
    }
  }
`;

const HintText = styled.p`
  font-size: ${({ theme }) => `calc(${theme.fontSizes[0]})`};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
export const ClientStatusSelection = ({
  onToggle,
  clientType,
  reservationWelcome,
  setReservationWelcome,
}) => {
  const { editMode } = useContext(ThemePreferenceContext);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {editMode && reservationWelcome?.id ? (
        <>
          {reservationWelcome?.id && (
            <EditForm onSubmit={(e) => e.preventDefault()}>
              <Tiptap
                content={reservationWelcome?.content || { content: "" }}
                onSave={(html) => {
                  setReservationWelcome({
                    content: html,
                  });
                  saveContent({
                    apiPath: `/api/content-item/${reservationWelcome.id}`,
                    payload: { content: html },
                    setLoading: setIsLoading,
                  });
                }}
                isLoading={isLoading}
              />
            </EditForm>
          )}
        </>
      ) : (
        <>
          <Content>
            <div
              dangerouslySetInnerHTML={{
                __html: reservationWelcome?.content,
              }}
            />
          </Content>
          <Content>
            <h4>New or Existing Client?</h4>
            <Flex>
              <Flex f="column">
                <button
                  data-active={clientType.clientType === "new"}
                  onClick={() => {
                    onToggle("new");
                  }}
                >
                  <p>
                    <UserAddOutlined /> New Clients
                  </p>
                  <HintText>
                    A new client has never boarded with us before.
                  </HintText>
                </button>
              </Flex>
              <Flex f="column">
                <Link href="/auth/signin?status=existingClient">
                  <a data-active={clientType.clientType === "existing"}>
                    <p>
                      <UserOutlined /> Existing Clients
                    </p>
                    <HintText>
                      An existing client has boarded with us in the past.
                    </HintText>
                  </a>
                </Link>
              </Flex>
            </Flex>
          </Content>
        </>
      )}
    </>
  );
};
