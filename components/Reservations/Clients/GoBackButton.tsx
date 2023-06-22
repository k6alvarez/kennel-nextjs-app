import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";
import { Button } from "../../ui-kit/Base";
import { prev } from "../helpers";

export const GoBackButton = ({ current, setCurrent, setFormError }) => {
  return (
    <>
      {current > 0 && (
        <Button
          type="button"
          onClick={() => {
            if (current === 2) {
              setFormError(undefined);
            }
            prev({ current, setCurrent });
          }}
        >
          <ArrowLeftOutlined /> Back
        </Button>
      )}
    </>
  );
};
