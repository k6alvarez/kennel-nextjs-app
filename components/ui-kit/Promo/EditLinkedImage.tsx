import Link from "next/link";
import React from "react";
import { GridItem } from "../Base";
import { PromoTextWrapper, ImageZoomWrapper } from "./styles-promo";
import styled from "styled-components";
import message from "antd/lib/message";
import { StyledInput, StyledLabel } from "../../Forms/styles";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.theme.space[2]} 0;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space[2]};

  ${StyledLabel} {
    font-size: ${(props) => props.theme.fontSizes[0]};
    margin: 0;
    padding: 0;
  }

  input {
    font-size: ${(props) => props.theme.fontSizes[0]};
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
    width: max-content;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    font-size: ${({ theme }) => theme.fontSizes[0]};
    white-space: nowrap;
  }
`;
export const EditLinkedImage = ({
  currentTheme,
  promo,
  updatePromo,
  editMode,
  isLoading,
  setIsLoading,
}) => {
  if (!promo) return null;
  return (
    <>
      {editMode ? (
        <PromoTextWrapper currentTheme={currentTheme} hasLink={!!promo.link}>
          <Flex>
            <ImageZoomWrapper>
              <GridItem img={promo.image} />
            </ImageZoomWrapper>
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
                // const uploadedImage = await fetch(
                //   `/api/promo-item/${promo.id}`,
                //   {
                //     method: "PUT",
                //     headers: {
                //       "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({
                //       image: data.secure_url,
                //     }),
                //   }
                // ).then((res) => res.json());
                // if (uploadedImage.error) {
                //   message.error(uploadedImage.error);
                //   setIsLoading(false);
                //   return;
                // }
                updatePromo &&
                  updatePromo({ ...promo, image: data.secure_url });
                // message.success(`New image uploaded.`);
                setIsLoading(false);
              }}
              disabled={isLoading}
              accept="image/*"
            />
          </Flex>
          <Flex>
            <StyledLabel htmlFor="title">Title</StyledLabel>
            <StyledInput
              type="text"
              name="title"
              id="title"
              value={promo.title}
              onChange={(e) => {
                e.preventDefault();
                updatePromo &&
                  updatePromo({
                    ...promo,
                    title: e.target.value,
                  });
              }}
            />
          </Flex>
          <Flex>
            <StyledLabel htmlFor="description">Description</StyledLabel>
            <StyledInput
              type="text"
              name="description"
              id="description"
              value={promo.description}
              onChange={(e) => {
                e.preventDefault();
                updatePromo &&
                  updatePromo({
                    ...promo,
                    description: e.target.value,
                  });
              }}
            />
            <button
              type="button"
              onClick={async () => {
                setIsLoading(true);
                const data = await fetch(`/api/promo-item/${promo.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ...promo,
                    title: promo.title,
                    description: promo.description,
                  }),
                }).then((res) => res.json());
                if (data.error) {
                  message.error(data.error);
                  setIsLoading(false);
                  return;
                }
                message.success(`Content updated.`);
                setIsLoading(false);
              }}
            >
              Save Changes
            </button>
          </Flex>
        </PromoTextWrapper>
      ) : (
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
      )}
    </>
  );
};
