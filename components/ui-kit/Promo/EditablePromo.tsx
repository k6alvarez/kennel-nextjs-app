import Link from "next/link";
import React, { useState } from "react";
import message from "antd/lib/message";
import { useSpring, config, animated } from "react-spring";
import { GridItem } from "../Base";
import { PromoTextWrapper, ImageZoomWrapper } from "./styles-promo";
import styled from "styled-components";
import { StyledInput, StyledLabel } from "../../Forms/styles";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.theme.space[3]};
  gap: ${(props) => props.theme.space[2]};

  ${StyledLabel} {
    font-size: ${(props) => props.theme.fontSizes[0]};
    color: ${(props) => props.theme.colors.textPrimary};
    margin: 0;
    padding: 0;
  }

  input {
    border: 1px solid ${(props) => props.theme.colors.textPrimary};
    font-size: ${(props) => props.theme.fontSizes[0]};
  }
`;

export const EditablePromo = ({
  promo,
  updatePromo,
  i,
  delay,
  noMargin,
  editMode,
  currentTheme,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const props = useSpring({
    to: { opacity: 1, transform: "translate3d(0,0,0)" },
    from: {
      opacity: 0,
      transform: `translate3d(0, 100px ,0)`,
    },
    delay: delay + i * 180,
    config: config.slow,
  });
  return (
    <animated.div
      key={promo.id}
      style={{
        ...props,
        margin: noMargin ? "2rem 0" : "2rem 1rem",
        display: noMargin ? "flex" : "initial",
        justifyContent: noMargin ? "center" : "initial",
        width: noMargin ? "100%" : "calc(100% - 2rem)",
      }}
    >
      {promo.link ? (
        <PromoTextWrapper currentTheme={currentTheme} hasLink={!!promo.link}>
          <Link href={promo.link}>
            <a>
              <ImageZoomWrapper>
                <GridItem img={promo.image} />
              </ImageZoomWrapper>
              <div>
                {promo.title ? (
                  <h2 style={{ width: "100%", textAlign: "center" }}>
                    {promo.title}
                  </h2>
                ) : null}
                {promo.description ? (
                  <span style={{ width: "100%", textAlign: "center" }}>
                    {promo.description}
                  </span>
                ) : null}
              </div>
            </a>
          </Link>
        </PromoTextWrapper>
      ) : (
        <>
          {editMode ? (
            <Flex>
              <GridItem size={promo.size} img={promo.image} />
              <StyledInput
                type={"file"}
                name={promo.id}
                id={promo.id}
                onChange={async (e) => {
                  e.preventDefault();
                  const file = e.target.files[0];
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", "gk-app");
                  setIsLoading(true);

                  message.loading(`Uploading new image.`);
                  const data = await fetch(
                    "https://api.cloudinary.com/v1_1/dhcv2fdfq/image/upload",
                    {
                      method: "POST",
                      body: formData,
                    }
                  ).then((res) => res.json());
                  const uploadedImage = await fetch(
                    `/api/promo-item/${promo.id}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        image: data.secure_url,
                      }),
                    }
                  ).then((res) => res.json());
                  if (uploadedImage.error) {
                    message.error(uploadedImage.error);
                    setIsLoading(false);
                    return;
                  }
                  updatePromo && updatePromo(uploadedImage);
                  message.success(`New image uploaded.`);
                  setIsLoading(false);
                }}
                disabled={isLoading}
                accept="image/*"
              />
            </Flex>
          ) : (
            <>
              <GridItem size={promo.size} img={promo.image} />
              {promo.title ? (
                <h2 style={{ width: "100%", textAlign: "center" }}>
                  {promo.title}
                </h2>
              ) : null}
              {promo.description ? (
                <span style={{ width: "100%", textAlign: "center" }}>
                  {promo.description}
                </span>
              ) : null}
            </>
          )}
        </>
      )}
    </animated.div>
  );
};
