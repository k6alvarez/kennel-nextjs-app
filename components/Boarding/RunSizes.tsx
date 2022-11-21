import { Card, Image } from "antd";
import React from "react";
import { DetailItem } from "../../pages/reservation/[id]";
import { LetterSpacedText } from "../Footer";
import { base } from "../ui-kit/Theme";
import { FlexCards, RunSizeWrapper } from "./styles";

export const RunSizes = () => {
  return (
    <RunSizeWrapper>
      <FlexCards autoFill>
        <Card
          cover={
            <Image src="https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419351/gk-app/Rocks_are_lava.jpg" />
          }
          title={<h2>Giant Run</h2>}
        >
          <DetailItem>
            <LetterSpacedText fs={base.fontSizes[3]} bold>
              Inside:
            </LetterSpacedText>
            <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[3]}>
              5ft x 6ft
            </LetterSpacedText>
          </DetailItem>
          <DetailItem>
            <LetterSpacedText fs={base.fontSizes[3]} bold>
              Outside:
            </LetterSpacedText>
            <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[3]}>
              5ft x 15ft
            </LetterSpacedText>
          </DetailItem>
        </Card>
        <Card
          cover={
            <Image src="https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419357/gk-app/BTS_Eike.png" />
          }
          title={<h2>Large Run</h2>}
        >
          <DetailItem>
            <LetterSpacedText fs={base.fontSizes[3]} bold>
              Inside:
            </LetterSpacedText>
            <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[3]}>
              4ft x 6ft
            </LetterSpacedText>
          </DetailItem>
          <DetailItem>
            <LetterSpacedText fs={base.fontSizes[3]} bold>
              Outside:
            </LetterSpacedText>
            <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[3]}>
              4ft x 15ft
            </LetterSpacedText>
          </DetailItem>
        </Card>
        <Card
          cover={
            <Image src="https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419357/gk-app/Jager_fence.png" />
          }
          title={<h2>Small Run</h2>}
        >
          <DetailItem>
            <LetterSpacedText fs={base.fontSizes[3]} bold>
              Inside:
            </LetterSpacedText>
            <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[3]}>
              3ft x 6ft
            </LetterSpacedText>
          </DetailItem>
          <DetailItem>
            <LetterSpacedText fs={base.fontSizes[3]} bold>
              Outside:
            </LetterSpacedText>
            <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[3]}>
              3ft x 15ft
            </LetterSpacedText>
          </DetailItem>
        </Card>
      </FlexCards>
    </RunSizeWrapper>
  );
};

export const RunSizesCWing = () => {
  return (
    <RunSizeWrapper>
      <FlexCards>
        <Card
          cover={
            <Image src="https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419353/gk-app/Selena_bathtime.jpg" />
          }
          title={<h2>C-Wing Large Run</h2>}
        >
          <DetailItem>
            <LetterSpacedText fs={base.fontSizes[3]} bold>
              Inside:
            </LetterSpacedText>
            <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[3]}>
              4ft x 4.5ft
            </LetterSpacedText>
          </DetailItem>
          <DetailItem>
            <LetterSpacedText fs={base.fontSizes[3]} bold>
              Outside:
            </LetterSpacedText>
            <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[3]}>
              4ft x 15ft
            </LetterSpacedText>
          </DetailItem>
        </Card>

        <Card
          cover={
            <Image src="https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419351/gk-app/Ruthie.jpg" />
          }
          title={<h2>C-Wing Small Run</h2>}
        >
          <DetailItem>
            <LetterSpacedText fs={base.fontSizes[3]} bold>
              Inside:
            </LetterSpacedText>
            <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[3]}>
              3ft x 4.5ft
            </LetterSpacedText>
          </DetailItem>
          <DetailItem>
            <LetterSpacedText fs={base.fontSizes[3]} bold>
              Outside:
            </LetterSpacedText>
            <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[3]}>
              3ft x 15ft
            </LetterSpacedText>
          </DetailItem>
        </Card>
      </FlexCards>
    </RunSizeWrapper>
  );
};
