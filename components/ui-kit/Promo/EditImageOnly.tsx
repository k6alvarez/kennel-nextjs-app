import React, { useEffect, useState } from "react";
import styled from "styled-components";
import message from "antd/lib/message";
import { Field, Fields, StyledInput, StyledLabel } from "../../Forms/styles";
import { Button, GridItem } from "../Base";
import { animated, config, useSpring } from "react-spring";

const EditModeContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.textSecondary};
  padding: ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.fontSizes[0]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${(props) => props.theme.space[2]};
`;

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
    font-size: ${(props) => props.theme.fontSizes[0]};
  }
`;

const GridItemAnimated = animated(GridItem);

export const EditImageOnly = ({
  editMode,
  promo,
  updatePromo,
  isLoading,
  setIsLoading,
  bannerMode = false,
}) => {
  const [fromPos, setFromPos] = useState(`${bannerMode ? "50%" : "30%"}`);
  const [toPos, setToPos] = useState(`${bannerMode ? "80%" : "80%"}`);
  const duration = 50000;

  if (!promo) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      setFromPos(toPos);
      setToPos(fromPos);
    }, duration);
    return () => clearInterval(interval);
  }, [fromPos, toPos]);

  return (
    <>
      {editMode ? (
        <Flex>
          <GridItem
            size={promo.size}
            img={promo.image}
            bannerMode={bannerMode}
          />
          <EditModeContainer>
            <Fields>
              <Field>
                <label htmlFor="size">Size</label>
                <select
                  name="size"
                  id="size"
                  value={promo.size}
                  onChange={(e) =>
                    updatePromo({ ...promo, size: e.target.value })
                  }
                >
                  <option value="">Default</option>
                  <option value="33vh">Small</option>
                  <option value="50vh">Medium</option>
                  <option value="75vh">Large</option>
                </select>
              </Field>
              <Field>
                <label htmlFor="image">Image</label>
                <StyledInput
                  type={"file"}
                  name={promo.id}
                  id={promo.id}
                  onChange={async (e) => {
                    e.preventDefault();
                    const file = e.target.files[0];
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", "gk-app-main-banner");
                    setIsLoading(true);

                    message.loading(`Uploading new image.`);
                    const data = await fetch(
                      "https://api.cloudinary.com/v1_1/dhcv2fdfq/image/upload",
                      {
                        method: "POST",
                        body: formData,
                      }
                    ).then((res) => res.json());

                    updatePromo &&
                      updatePromo({ ...promo, image: data.secure_url });
                    message.success(`New image uploaded.`);
                    setIsLoading(false);
                  }}
                  disabled={isLoading}
                  accept="image/*"
                />
              </Field>
              <Field grow align="flex-start">
                <span>Image Url: {promo.image}</span>
              </Field>
            </Fields>
            <Button
              primary
              small
              onClick={async () => {
                setIsLoading(true);
                const uploadedImage = await fetch(
                  `/api/promo-item/${promo.id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      image: promo.image,
                      size: promo.size,
                    }),
                  }
                ).then((res) => res.json());
                if (uploadedImage.error) {
                  message.error(uploadedImage.error);
                  setIsLoading(false);
                  return;
                }
                message.success(`Image updated.`);
                setIsLoading(false);
              }}
            >
              Save Image
            </Button>
          </EditModeContainer>
        </Flex>
      ) : (
        <>
          <GridItemAnimated
            size={promo.size}
            img={promo.image}
            bannerMode={bannerMode}
          />
        </>
      )}
    </>
  );
};
