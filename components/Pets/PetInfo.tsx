import { LinkOutlined } from "@ant-design/icons";
import { Avatar, Tag } from "antd";
import { DateTime } from "luxon";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { FlexCards } from "../Boarding/styles";
import { PET_INITIAL_STATE } from "./petFormReducer";
import { isValidHttpUrl } from "./services";

const Key = styled.span`
  font-size: ${(props) => props.theme.fontSizes[0]};
  text-transform: capitalize;
  font-weight: bold;
  white-space: pre-wrap;
`;

const Value = styled.span`
  font-size: ${(props) => props.theme.fontSizes[0]};
  text-transform: capitalize;
`;

const Pair = styled.div`
  white-space: nowrap;

  a {
    font-size: ${(props) => props.theme.fontSizes[0]};
  }
`;

const Flex = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space[3]};

  .ant-tag {
    padding: 2px 4px;
    font-size: ${(props) => `calc(${props.theme.fontSizes[0]}/1.5)`};
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export const PetInfo = ({ pet }) => {
  return (
    <Wrapper>
      {Object.keys(pet).map((key, i) => {
        return (
          <Pair key={key + "-" + i}>
            {key === "image" && isValidHttpUrl(pet[key]) && (
              <Avatar shape="square" size={100} alt="example" src={pet[key]} />
            )}
            <Key>{PET_INITIAL_STATE[key]?.label}</Key>: <br />
            {key === "vaccinations" ? (
              <a href={pet[key]} target="_blank">
                <LinkOutlined /> View Vaccinations
              </a>
            ) : (
              <Value>
                {PET_INITIAL_STATE[key]?.type === "date" ? (
                  <div>
                    {DateTime.local() > DateTime.fromISO(pet[key]) ? (
                      <Flex>
                        {DateTime.fromISO(pet[key]).toLocaleString(
                          DateTime.DATE_MED
                        )}
                        <Tag color="red">Vaccine Expired</Tag>
                      </Flex>
                    ) : (
                      DateTime.fromISO(pet[key]).toLocaleString(
                        DateTime.DATE_MED
                      )
                    )}
                  </div>
                ) : (
                  pet[key]
                )}
              </Value>
            )}
          </Pair>
        );
      })}
    </Wrapper>
  );
};
