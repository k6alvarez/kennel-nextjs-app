import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";
import { Button } from "../../ui-kit/Base";
import { prev } from "../helpers";

export const GoBackButton = ({ current, setCurrent, formSteps }) => {
  return (
    <>
      {current > 0 && (
        <Button type="button" onClick={() => prev({ current, setCurrent })}>
          <ArrowLeftOutlined /> Go back to {formSteps[current - 1].title}
        </Button>
      )}
    </>
  );
};
