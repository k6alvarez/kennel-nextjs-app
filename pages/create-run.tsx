import React, { useRef, useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { Content } from "../components/ui-kit/Base";
import { LockOutlined } from "@ant-design/icons";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { Image, message } from "antd";
import styled from "styled-components";
import { Error } from "../components/Forms/styles";

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};

  img {
    width: 18vw;
    height: 18vw;
    object-fit: cover;
  }
`;
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: {} };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      revalidate: 10,
    },
  };
};

const CreateRun = ({ user }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [wing, setWing] = useState("A");
  const [sizeInside, setSizeInside] = useState("");
  const [sizeOutside, setSizeOutside] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [roommateDailyRate, setRoommateDailyRate] = useState("");
  const [holidayPremiumRate, setHolidayPremiumRate] = useState("");
  const [petType, setPetType] = useState("dog");
  const [gallery, setGallery] = useState([]);
  const fileInput = useRef(null);
  const [formError, setFormError] = useState(null);

  const resetForm = () => {
    setName("");
    setSizeInside("");
    setSizeOutside("");
    setDailyRate("");
    setRoommateDailyRate("");
    setHolidayPremiumRate("");
    setPetType("dog");
    setGallery([]);
    fileInput.current.value = null;
    setFormError(null);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const body = {
        name,
        petType,
        sizeInside,
        sizeOutside,
        dailyRate,
        roommateDailyRate,
        holidayPremiumRate,
        gallery,
        wing,
      };
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        let formErrorMessage = "Something went wrong. Please try again.";
        if (response.status === 409) {
          formErrorMessage =
            "A run with this name already exists. Please try again with a different name.";
        }
        setFormError(formErrorMessage);
        setIsLoading(false);
        return;
      } else {
        message.success("Run created successfully.");
        setIsLoading(false);
        resetForm();
      }
    } catch (error) {
      console.error(error);
      setFormError(error);
      setIsLoading(false);
    }
  };

  if (!session || !user.permissions.includes("ADMIN")) {
    return (
      <Layout>
        <Content>
          <h1>
            <LockOutlined rev={undefined} /> Restricted Area
          </h1>
          <div>You need to be authenticated to view this page.</div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isLoading}>
            <h1>Create pet run.</h1>
            <p>
              Runs added via this form will be used to display run information
              and provide the form options for users when booking a reservation.
            </p>
            <Error>{formError}</Error>
            <label htmlFor="name">Name of Run</label>
            <input
              autoFocus
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              id="name"
            />

            <label htmlFor="wing">Wing</label>
            <select onChange={(e) => setWing(e.target.value)} value={wing}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>

            <label htmlFor="petType">Pet Type</label>
            <select
              onChange={(e) => setPetType(e.target.value)}
              value={petType}
              id="petType"
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>

            <label htmlFor="sizeInside">
              Inside size of run (e.g. 5ft x 6ft)
            </label>
            <input
              onChange={(e) => setSizeInside(e.target.value)}
              type="text"
              value={sizeInside}
              id="sizeInside"
            />

            <label htmlFor="sizeOutside">
              Outside size of run (e.g. 5ft x 6ft)
            </label>
            <input
              onChange={(e) => setSizeOutside(e.target.value)}
              type="text"
              value={sizeOutside}
              id="sizeOutside"
            />

            <label htmlFor="dailyRate">Daily Rate</label>
            <input
              onChange={(e) => setDailyRate(e.target.value)}
              type="text"
              value={dailyRate}
              id="dailyRate"
            />

            <label htmlFor="roommateDailyRate">Roommate Daily Rate</label>
            <input
              onChange={(e) => setRoommateDailyRate(e.target.value)}
              type="text"
              value={roommateDailyRate}
              id="roommateDailyRate"
            />

            <label htmlFor="holidayPremiumRate">Holiday Premium Rate</label>
            <input
              onChange={(e) => setHolidayPremiumRate(e.target.value)}
              type="text"
              value={holidayPremiumRate}
              id="holidayPremiumRate"
            />

            <label htmlFor="gallery">
              Upload images to use as a gallery for the run.
            </label>
            <input
              ref={fileInput}
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
                  setGallery((prev) => [...prev, data.secure_url]);
                });
              }}
            />
            {gallery.length > 0 && (
              <>
                <p>Images Uploaded</p>
                <PreviewWrapper>
                  {gallery.map((image, i) => (
                    <Image key={i} src={image} alt="Uploaded Image" />
                  ))}
                </PreviewWrapper>
              </>
            )}
            <Error>{formError}</Error>
            <input
              disabled={isLoading}
              type="submit"
              value={isLoading ? "Loading..." : "Submit"}
            />
            <a href="#" onClick={() => Router.push("/")}>
              or Cancel
            </a>
          </fieldset>
        </form>
      </Content>
    </Layout>
  );
};

export default CreateRun;
