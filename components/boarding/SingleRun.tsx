"use client";
import { useState } from "react";
import { PetRun } from "@prisma/client";
import { Button, Card, Image, Tag } from "antd";

const { PreviewGroup } = Image;

const SingleRun = ({ run }: { run: PetRun }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Card
      className="shadow"
      style={{
        backgroundColor: "rgba(var(--secondary), 0.5)",
        padding: "1rem",
      }}
    >
      <Image
        preview={{ visible: false }}
        width="80%"
        src={run.gallery[0]}
        onClick={() => setVisible(true)}
      />
      <br />
      <h2>{run.name}</h2>
      {run.dailyRate && (
        <p className="flex flex-col gap-2 text-lg items-center justify-center">
          <span className="text-sm font-semibold text-gray-800 text-center">
            Daily Rate:
          </span>{" "}
          <Tag className="m-0">
            <span className="text-lg">${Number(run.dailyRate).toFixed(2)}</span>
          </Tag>
        </p>
      )}
      <div className="flex gap-6 justify-around w-full">
        {run.roommateDailyRate && (
          <p className="flex flex-col gap-2 text-lg items-center justify-center">
            <span className="text-sm font-semibold text-gray-800 text-center">
              Roommate Daily Rate:
            </span>{" "}
            <Tag className="m-0">
              <span className="text-lg">
                ${Number(run.roommateDailyRate).toFixed(2)}
              </span>
            </Tag>
          </p>
        )}
        {run.holidayPremiumRate && (
          <p className="flex flex-col gap-2 text-lg items-center justify-center">
            <span className="text-sm font-semibold text-gray-800 text-center">
              Holiday Premium Rate:
            </span>{" "}
            <Tag className="m-0">
              <span className="text-lg">
                ${Number(run.holidayPremiumRate).toFixed(2)}
              </span>
            </Tag>
          </p>
        )}
      </div>
      <div className="flex gap-6 justify-around w-full">
        {run.sizeInside && (
          <p className="flex flex-col gap-2 text-lg items-center justify-center">
            <span className="text-sm font-semibold text-gray-800">
              Size Inside:
            </span>{" "}
            <Tag className="m-0">
              <span className="text-lg">{run.sizeInside}</span>
            </Tag>
          </p>
        )}
        {run.sizeOutside && (
          <p className="flex flex-col gap-2 text-lg items-center justify-center">
            <span className="text-sm font-semibold text-gray-800">
              Size Outside:
            </span>{" "}
            <Tag className="m-0">
              <span className="text-lg">{run.sizeOutside}</span>
            </Tag>
          </p>
        )}
      </div>
      {run.gallery.length > 1 && (
        <Button className="mt-6" onClick={() => setVisible(true)}>
          View More Photos
        </Button>
      )}
      <div style={{ display: "none" }}>
        <PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
          }}
        >
          {run.gallery.map((image, i) => {
            return <Image key={i + "-image"} width="90%" src={image} />;
          })}
        </PreviewGroup>
      </div>
    </Card>
  );
};

export default SingleRun;
