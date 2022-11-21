import React from "react";
import styled from "styled-components";
import { Image } from "antd";
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.space[4]};
  > div {
    width: 25vw;

    &:first-child {
      width: max-content;
    }
  }
`;

export const Gallery = ({ images }) => {
  return (
    <Wrapper>
      <Image.PreviewGroup>
        {images.map((image) => (
          <Image src={image.src} />
        ))}
      </Image.PreviewGroup>
    </Wrapper>
  );
};
