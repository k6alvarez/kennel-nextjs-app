import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

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
export const ClientStatusSelection = ({ onToggle, clientType }) => {
  return (
    <>
      <h1>Welcome to our pet boarding facility!</h1>
      <p>
        To ensure the safety and health of all our guests, we require that pets
        are up to date on their vaccinations before their stay. For dogs, we
        require the DHLPP, Rabies, and Bordetella vaccines, while cats must have
        the FVRCP, Leukemia, and Rabies vaccines. We kindly ask that you make
        your reservation at least 2 weeks in advance of your arrival and note
        that reservations made through our system are not confirmed until you
        receive an email or phone confirmation from us. Thank you for
        considering us for your pet's boarding needs.
      </p>
      <p>Please tell us if your are a new or existing client.</p>
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
