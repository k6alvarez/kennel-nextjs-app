import { LinkOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { DateTime } from "luxon";
import React from "react";
import styled from "styled-components";
import { PET_INITIAL_STATE } from "./petFormReducer";

const Key = styled.span`
  font-weight: bold;
  white-space: pre-wrap;
`;

const Value = styled.span``;

const Pair = styled.div`
  white-space: nowrap;
  display: flex;
  gap: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[4]};
  font-size: calc(${(props) => props.theme.fontSizes[0]} / 1.2);
  text-transform: capitalize;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.space[5]};
`;

export const PetInfo = ({ pet, children = undefined }) => {
  return (
    <Wrapper>
      <div>
        {Object.keys(pet).map((key, i) => {
          return (
            <Pair key={key + "-" + i}>
              {key !== "image" && (
                <>
                  <Key>{PET_INITIAL_STATE[key]?.label}:</Key>
                  {key === "vaccinations" ? (
                    <a href={pet[key]} target="_blank">
                      <LinkOutlined /> View Vaccinations
                    </a>
                  ) : (
                    <Value>
                      {PET_INITIAL_STATE[key]?.type === "date" ? (
                        <div>
                          {DateTime.local() > DateTime.fromISO(pet[key]) ? (
                            <>
                              <Tag color="red">
                                {" "}
                                {DateTime.fromISO(pet[key]).toLocaleString(
                                  DateTime.DATE_MED
                                )}{" "}
                                Expired
                              </Tag>
                            </>
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
                </>
              )}
            </Pair>
          );
        })}
      </div>
      {children}
    </Wrapper>
  );
};
