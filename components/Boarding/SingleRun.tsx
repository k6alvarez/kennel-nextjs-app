import React, { useState } from "react";
import { Card, Image } from "antd";
import styled from "styled-components";
import { DetailItem } from "../../pages/reservation/[id]";
import { LetterSpacedText } from "../Footer";
import { base } from "../ui-kit/Theme";
import { EditSingleRun } from "./EditSingleRun";
import { Button } from "../ui-kit/Base";
import { SingleRunGallery } from "./SingleRunGallery";

const Flex = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  grid-template-columns: 1fr 1fr;
  padding-top: ${({ theme }) => theme.space[4]};
`;

export const RunItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  order: ${({ order }) => order};

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
export const SingleRun = ({ run, setRuns, editMode }) => {
  return (
    <RunItem order={run.order}>
      {editMode ? (
        <EditSingleRun run={run} setRuns={setRuns} />
      ) : (
        <Card>
          <p
            style={{
              textAlign: "center",
            }}
          >
            {run.name}
          </p>
          {run.gallery.length > 0 && <SingleRunGallery gallery={run.gallery} />}

          <Flex>
            {run.sizeInside && (
              <DetailItem>
                <LetterSpacedText fs={base.fontSizes[1]} bold>
                  Inside:
                </LetterSpacedText>
                <LetterSpacedText
                  textTransform="lowercase"
                  fs={base.fontSizes[1]}
                >
                  {run.sizeInside}
                </LetterSpacedText>
              </DetailItem>
            )}

            {run.sizeOutside && (
              <DetailItem>
                <LetterSpacedText fs={base.fontSizes[1]} bold>
                  Outside:
                </LetterSpacedText>
                <LetterSpacedText
                  textTransform="lowercase"
                  fs={base.fontSizes[1]}
                >
                  {run.sizeOutside}
                </LetterSpacedText>
              </DetailItem>
            )}
          </Flex>

          <Flex>
            {run.dailyRate && (
              <DetailItem>
                <LetterSpacedText fs={base.fontSizes[1]} bold>
                  Daily Rates:
                </LetterSpacedText>
                <LetterSpacedText
                  textTransform="lowercase"
                  fs={base.fontSizes[1]}
                >
                  ${run.dailyRate}
                </LetterSpacedText>
              </DetailItem>
            )}

            {run.roommateDailyRate && (
              <DetailItem>
                <LetterSpacedText fs={base.fontSizes[1]} bold>
                  Each Roommate Daily Rate:
                </LetterSpacedText>
                <LetterSpacedText
                  textTransform="lowercase"
                  fs={base.fontSizes[1]}
                >
                  ${run.roommateDailyRate}
                </LetterSpacedText>
              </DetailItem>
            )}
          </Flex>

          {run.holidayPremiumRate && (
            <DetailItem>
              <LetterSpacedText fs={base.fontSizes[1]} bold>
                Holiday Rates:
              </LetterSpacedText>
              <LetterSpacedText
                textTransform="lowercase"
                fs={base.fontSizes[1]}
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
