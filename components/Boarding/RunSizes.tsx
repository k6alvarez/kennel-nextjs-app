import { Card, Image } from "antd";
import React from "react";
import { DetailItem } from "../../pages/reservation/[id]";
import { LetterSpacedText } from "../Footer";
import { base } from "../ui-kit/Theme";
import { FlexCards } from "./styles";

export const RunSizes = () => {
  return (
    <FlexCards>
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
          <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[2]}>
            5ft x 6ft
          </LetterSpacedText>
        </DetailItem>
        <DetailItem>
          <LetterSpacedText fs={base.fontSizes[3]} bold>
            Outside:
          </LetterSpacedText>
          <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[2]}>
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
          <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[2]}>
            4ft x 6ft
          </LetterSpacedText>
        </DetailItem>
        <DetailItem>
          <LetterSpacedText fs={base.fontSizes[3]} bold>
            Outside:
          </LetterSpacedText>
          <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[2]}>
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
          <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[2]}>
            3ft x 6ft
          </LetterSpacedText>
        </DetailItem>
        <DetailItem>
          <LetterSpacedText fs={base.fontSizes[3]} bold>
            Outside:
          </LetterSpacedText>
          <LetterSpacedText textTransform="lowercase" fs={base.fontSizes[2]}>
            3ft x 15ft
          </LetterSpacedText>
        </DetailItem>
      </Card>
    </FlexCards>
  );
};
