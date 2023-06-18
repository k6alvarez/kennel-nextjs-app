import { LinkOutlined } from "@ant-design/icons";
import { Avatar, Tag } from "antd";
import { DateTime } from "luxon";
import React from "react";
import styled from "styled-components";
import { PET_INITIAL_STATE } from "./petFormReducer";
import { isValidHttpUrl } from "./services";

const Key = styled.span`
  font-weight: bold;
  white-space: nowrap;
`;

const Value = styled.span``;

const Pair = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  flex: 1;

  margin-bottom: ${(props) => props.theme.space[4]};
  font-size: calc(${(props) => props.theme.fontSizes[0]} / 1.2);
  text-transform: capitalize;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.space[5]};
`;

const PairWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.space[5]};
  width: 100%;
`;

export const PetInfo = ({ pet, children = undefined }) => {
  const petMinusImage = Object.keys(pet).reduce((acc, key) => {
    if (key !== "image") {
      acc[key] = pet[key];
    }
    return acc;
  }, {});

  return (
    <Wrapper>
      <Container>
        {Object.keys(petMinusImage).map((key, i) => {
          return (
            <PairWrapper key={key}>
              {key !== "image" && (
                <Pair key={key + "-" + i}>
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
                </Pair>
              )}
            </PairWrapper>
          );
        })}
        {isValidHttpUrl(pet.image) && (
          <Avatar shape="square" size={200} alt="example" src={pet.image} />
        )}
      </Container>
      {children}
    </Wrapper>
  );
};
