import React from "react";

import { useSpring, config, animated } from "react-spring";
import { EditImageOnly } from "./EditImageOnly";
import { EditLinkedImage } from "./EditLinkedImage";

export const EditablePromo = ({
  promo,
  updatePromo,
  i = 0,
  delay = 0,
  editMode,
  currentTheme,
  isLoading,
  setIsLoading,
  bannerMode = false,
  animate = true,
}) => {
  const props = useSpring({
    to: { opacity: 1, transform: "scale(1)" },
    from: {
      opacity: animate ? 0 : 1,
      transform: animate ? `scale(0.9)` : "scale(1)",
    },
    delay: delay + i * 180,
    config: config.slow,
  });

  if (!promo) {
    return null;
  }
  return (
    <animated.div
      key={promo.id}
      style={{
        ...props,
        width: "100%",
      }}
    >
      <fieldset disabled={isLoading}>
        {promo?.link ? (
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
            bannerMode={bannerMode}
          />
        )}
      </fieldset>
    </animated.div>
  );
};
