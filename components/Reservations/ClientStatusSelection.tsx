import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.f || "row"};

  gap: ${({ theme }) => theme.space[2]};
  justify-content: space-between;

  button,
  a {
    width: 30vw;
    text-align: center;
    height: 30vw;
    padding: ${({ theme }) => theme.space[3]};
    box-shadow: ${({ theme }) => theme.shadows.default};
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    span {
    }

    &[data-active="true"],
    :hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
`;
export const ClientStatusSelection = ({ onToggle, clientType }) => {
  return (
    <>
      <h1>
        Welcome to the new Gillette Kennels website. Please tell us if your are
        a new or existing client.
      </h1>
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
            <span>A new client has never boarded with us before.</span>
          </button>
        </Flex>
        <Flex f="column">
          <Link href="/auth/signin?status=existingClient">
            <a data-active={clientType.clientType === "existing"}>
              <p>
                <UserOutlined /> Existing Client
              </p>
              <span>An existing client has boarded with us in the past.</span>
            </a>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};
