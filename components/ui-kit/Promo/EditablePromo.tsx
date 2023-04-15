import React from "react";

import { useSpring, config, animated } from "react-spring";
import { EditImageOnly } from "./EditImageOnly";
import { EditLinkedImage } from "./EditLinkedImage";

export const EditablePromo = ({
  promo,
  updatePromo,
  i,
  delay,
  noMargin,
  editMode,
  currentTheme,
  isLoading,
  setIsLoading,
}) => {
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
        // margin: noMargin ? "2rem 0" : "2rem 1rem",
        display: noMargin ? "flex" : "initial",
        justifyContent: noMargin ? "center" : "initial",
        // width: noMargin ? "100%" : "calc(100% - 2rem)",
        width: "100%",
      }}
    >
      <fieldset disabled={isLoading}>
        {promo.link ? (
          <EditLinkedImage
            editMode={editMode}
            currentTheme={currentTheme}
            promo={promo}
            updatePromo={updatePromo}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <EditImageOnly
            editMode={editMode}
            promo={promo}
            updatePromo={updatePromo}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </fieldset>
    </animated.div>
  );
};
