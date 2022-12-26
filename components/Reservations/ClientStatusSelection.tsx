import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.f || "row"};

  gap: ${({ theme }) => theme.space[2]};
  justify-content: space-around;

  button {
    width: 25vh;
    height: 25vh;
    box-shadow: ${({ theme }) => theme.shadows.default};

    &[data-active="true"] {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
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
            <p>A new client has never boarded with us before.</p>
          </button>
        </Flex>
        <Flex f="column">
          <button
            data-active={clientType.clientType === "existing"}
            onClick={() => {
              onToggle("existing");
            }}
          >
            <p>
              <UserOutlined /> Existing Client
            </p>
            <p>An existing client has boarded with us in the past.</p>
          </button>
        </Flex>
      </Flex>
    </>
  );
};
