import React, { useEffect, useState } from "react";
import styled from "styled-components";
import message from "antd/lib/message";
import { StyledInput, StyledLabel } from "../../Forms/styles";
import { GridItem } from "../Base";
import { animated, config, useSpring } from "react-spring";

const EditModeContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.textSecondary};
  padding: ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.fontSizes[0]};
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
    border: 1px solid ${(props) => props.theme.colors.textPrimary};
    font-size: ${(props) => props.theme.fontSizes[0]};
  }

  button {
    color: ${({ theme }) => theme.colors.textSecondary};
    width: max-content;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    font-size: ${({ theme }) => theme.fontSizes[0]};
    white-space: nowrap;
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

  const springProps = useSpring({
    from: { backgroundPosition: `50% ${fromPos}` },
    to: { backgroundPosition: `50% ${toPos}` },
    config: { ...config.molasses, duration: duration },
  });

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
            <p>Current image url: {promo.image}</p>
            <label htmlFor="size">Size</label>
            <select
              name="size"
              id="size"
              value={promo.size}
              onChange={(e) => updatePromo({ ...promo, size: e.target.value })}
            >
              <option value="">Default</option>
              <option value="33vh">Small</option>
              <option value="50vh">Medium</option>
              <option value="75vh">Large</option>
            </select>
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

                updatePromo &&
                  updatePromo({ ...promo, image: data.secure_url });
                message.success(`New image uploaded.`);
                setIsLoading(false);
              }}
              disabled={isLoading}
              accept="image/*"
            />
            <button
              type="button"
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
            </button>
          </EditModeContainer>
        </Flex>
      ) : (
        <>
          <GridItemAnimated
            style={springProps}
            size={promo.size}
            img={promo.image}
            bannerMode={bannerMode}
          />
        </>
      )}
    </>
  );
};
