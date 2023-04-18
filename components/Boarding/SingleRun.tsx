import React from "react";
import { Card, Image } from "antd";
import styled from "styled-components";
import { DetailItem } from "../../pages/reservation/[id]";
import { LetterSpacedText } from "../Footer";
import { base } from "../ui-kit/Theme";
import { EditSingleRun } from "./EditSingleRun";

const Flex = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: ${({ theme }) => theme.space[4]};
`;

export const RunItem = styled.div`
  display: flex;
  flex-direction: column;
  max-width: fit-content;

  input {
    margin-bottom: 1rem;
  }
`;

export const ZIndex = styled.div`
  position: relative;
  z-index: ${({ zIndex }) => zIndex};
  display: ${({ positionIndex }) => (positionIndex === 0 ? "block" : "none")};
  text-align: center;
`;
export const SingleRun = ({ run, editMode }) => {
  return (
    <RunItem>
      {editMode ? (
        <EditSingleRun run={run} />
      ) : (
        <Card>
          <p
            style={{
              textAlign: "center",
            }}
          >
            {run.name}
          </p>
          {run.gallery.length > 0 && (
            <Image.PreviewGroup>
              {run.gallery.map((image, i) => {
                return (
                  <ZIndex
                    positionIndex={i}
                    key={i}
                    zIndex={run.gallery.length - i}
                  >
                    <Image src={image} />
                  </ZIndex>
                );
              })}
            </Image.PreviewGroup>
          )}

          <Flex>
            {run.sizeInside && (
              <DetailItem>
                <LetterSpacedText fs={base.fontSizes[3]}>
                  Inside:
                </LetterSpacedText>
                <LetterSpacedText
                  textTransform="lowercase"
                  fs={base.fontSizes[3]}
                  bold
                >
                  {run.sizeInside}
                </LetterSpacedText>
              </DetailItem>
            )}

            {run.sizeOutside && (
              <DetailItem>
                <LetterSpacedText fs={base.fontSizes[3]}>
                  Outside:
                </LetterSpacedText>
                <LetterSpacedText
                  textTransform="lowercase"
                  fs={base.fontSizes[3]}
                  bold
                >
                  {run.sizeOutside}
                </LetterSpacedText>
              </DetailItem>
            )}
          </Flex>

          <Flex>
            {run.dailyRate && (
              <DetailItem>
                <LetterSpacedText fs={base.fontSizes[3]}>
                  Daily Rates:
                </LetterSpacedText>
                <LetterSpacedText
                  textTransform="lowercase"
                  fs={base.fontSizes[3]}
                  bold
                >
                  ${run.dailyRate}
                </LetterSpacedText>
              </DetailItem>
            )}

            {run.roommateDailyRate && (
              <DetailItem>
                <LetterSpacedText fs={base.fontSizes[3]}>
                  Each Roommate Daily Rate:
                </LetterSpacedText>
                <LetterSpacedText
                  textTransform="lowercase"
                  fs={base.fontSizes[3]}
                  bold
                >
                  ${run.roommateDailyRate}
                </LetterSpacedText>
              </DetailItem>
            )}
          </Flex>

          {run.holidayPremiumRate && (
            <DetailItem>
              <LetterSpacedText fs={base.fontSizes[3]}>
                Holiday Rates:
              </LetterSpacedText>
              <LetterSpacedText
                textTransform="lowercase"
                fs={base.fontSizes[3]}
                bold
              >
                Add ${run.holidayPremiumRate} per pet per day
              </LetterSpacedText>
            </DetailItem>
          )}
        </Card>
      )}
    </RunItem>
  );
};
