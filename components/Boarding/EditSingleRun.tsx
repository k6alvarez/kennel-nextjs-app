import { Card, Image, message } from "antd";
import React, { useEffect } from "react";
import { StyledInput, StyledLabel } from "../Forms/styles";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  margin: ${(props) => props.theme.space[2]} 0;
  gap: ${({ theme, gap }) => (gap ? theme.space[gap] : 0)};

  button {
    margin: ${({ theme }) => theme.space[4]};
    padding: ${({ theme }) => theme.space[3]};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    width: max-content;
    min-width: 100px;
  }
`;
export const EditSingleRun = ({ run }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentRun, setCurrentRun] = React.useState(run);
  const [newGallery, setNewGallery] = React.useState([]);

  const handleChange = (e) => {
    setCurrentRun({
      ...currentRun,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await fetch(`/api/run/${run.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...currentRun,
        gallery: newGallery.length > 0 ? newGallery : currentRun.gallery,
      }),
    }).then((res) => res.json());
    if (data.error) {
      message.error("Error while updating. Refresh and try again.");
      setIsLoading(false);
      return;
    }
    message.success(`Content updated.`);
    setIsLoading(false);
  };

  return (
    <Card>
      {console.log(currentRun)}
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading}>
          <StyledInput
            name="name"
            id="name"
            type="text"
            defaultValue={run.name}
            onChange={handleChange}
          />
          <Flex gap="4">
            {newGallery.length > 0 ? (
              <>
                {newGallery.map((image, i) => {
                  return (
                    <Image
                      style={{
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2) ",
                      }}
                      key={i}
                      width={"150px"}
                      src={image}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {currentRun.gallery.length > 0 &&
                  currentRun.gallery.map((image, i) => {
                    return (
                      <Image
                        style={{
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2) ",
                        }}
                        key={i}
                        width={"150px"}
                        src={image}
                      />
                    );
                  })}
              </>
            )}
          </Flex>
          <input
            type="file"
            id="gallery"
            name="gallery"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              message.loading(`Uploading images...`);
              files.map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "gk-runs");

                const data = await fetch(
                  "https://api.cloudinary.com/v1_1/dhcv2fdfq/image/upload",
                  {
                    method: "POST",
                    body: formData,
                  }
                ).then((res) => res.json());
                if (data.error) {
                  message.error(
                    "Error uploading image. Refresh and try again."
                  );
                  console.error(data.error);
                  return;
                }
                setNewGallery((prev) => [...prev, data.secure_url]);
              });
            }}
          />
          <StyledLabel htmlFor="sizeInside">Inside:</StyledLabel>
          <StyledInput
            id="sizeInside"
            name="sizeInside"
            type="text"
            defaultValue={run.sizeInside}
            onChange={handleChange}
          />

          <StyledLabel htmlFor="sizeOutside">Outside:</StyledLabel>
          <StyledInput
            id="sizeOutside"
            name="sizeOutside"
            type="text"
            defaultValue={run.sizeOutside}
            onChange={handleChange}
          />

          <StyledLabel htmlFor="dailyRate">Daily Rate:</StyledLabel>
          <StyledInput
            id="dailyRate"
            name="dailyRate"
            type="text"
            defaultValue={run.dailyRate}
            onChange={handleChange}
          />

          <StyledLabel htmlFor="roommateDailyRate">
            Roommate Daily Rate:
          </StyledLabel>
          <StyledInput
            id="roommateDailyRate"
            name="roommateDailyRate"
            type="text"
            defaultValue={run.roommateDailyRate}
            onChange={handleChange}
          />

          <StyledLabel htmlFor="holidayPremiumRate">
            Holiday Premium Rate:
          </StyledLabel>
          <StyledInput
            id="holidayPremiumRate"
            name="holidayPremiumRate"
            type="text"
            defaultValue={run.holidayPremiumRate}
            onChange={handleChange}
          />

          <StyledLabel htmlFor="order">Order:</StyledLabel>
          <StyledInput
            id="order"
            name="order"
            type="text"
            defaultValue={run.order}
            onChange={handleChange}
          />

          <Flex>
            <input type="submit" value="Save Changes" />
            <button type="button">Delete</button>
          </Flex>
        </fieldset>
      </form>
    </Card>
  );
};
