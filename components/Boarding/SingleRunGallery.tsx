import { Image } from "antd";
import React, { useState } from "react";
import { ZIndex } from "./SingleRun";
import { Button } from "../ui-kit/Base";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SingleRunGallery = ({ gallery }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Wrapper>
      <Image
        preview={{ visible: false }}
        width="80%"
        src={gallery[0]}
        onClick={() => setVisible(true)}
      />
      <br />
      {gallery.length > 1 && (
        <Button primary small type="button" onClick={() => setVisible(true)}>
          View More Photos
        </Button>
      )}
      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
          }}
        >
          {gallery.map((image, i) => {
            return (
              <ZIndex positionIndex={i} key={i} zIndex={gallery.length - i}>
                <Image width="90%" src={image} />
              </ZIndex>
            );
          })}
        </Image.PreviewGroup>
      </div>
    </Wrapper>
  );
};
