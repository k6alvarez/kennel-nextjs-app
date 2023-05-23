import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { EditForm } from "../Forms/styles";
import { Tiptap } from "../ui-kit/Tiptap";
import { ThemePreferenceContext } from "../../pages/_app";
import { saveContent } from "../Admin/services";

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.f || "column"};

  gap: ${({ theme }) => theme.space[6]};
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: ${(props) => props.f || "row"};
  }

  button,
  a {
    font-size: ${({ theme }) => `calc(${theme.fontSizes[4]})`};
    text-align: center;
    height: 25vw;
    min-width: 25vw;
    padding: ${({ theme }) => theme.space[4]};
    margin: 0 auto;
    box-shadow: ${({ theme }) => theme.shadows.default};
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    span {
      font-size: ${({ theme }) => `calc(${theme.fontSizes[5]})`};
    }

    &[data-active="true"],
    :hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

      span,
      p {
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

const HintText = styled.p`
  font-size: ${({ theme }) => `calc(${theme.fontSizes[1]})`};
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
      {editMode && reservationWelcome.id ? (
        <EditForm onSubmit={(e) => e.preventDefault()}>
          <Tiptap
            content={reservationWelcome?.content || { content: "" }}
            onSave={(html) => {
              setReservationWelcome({
                content: html,
              });
              saveContent({
                apiPath: `/api/content-item/${reservationWelcome.id}`,
                html,
                setLoading: setIsLoading,
              });
            }}
            isLoading={isLoading}
          />
        </EditForm>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: reservationWelcome?.content }}
        />
      )}

      <h4>Please tell us if your are a new or existing client.</h4>
      <Flex>
        <Flex f="column">
          <button
            data-active={clientType.clientType === "new"}
            onClick={() => {
              onToggle("new");
            }}
          >
            <p>
              <UserAddOutlined /> New Client
            </p>
            <HintText>A new client has never boarded with us before.</HintText>
          </button>
        </Flex>
        <Flex f="column">
          <Link href="/auth/signin?status=existingClient">
            <a data-active={clientType.clientType === "existing"}>
              <p>
                <UserOutlined /> Existing Client
              </p>
              <HintText>
                An existing client has boarded with us in the past.
              </HintText>
            </a>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};
