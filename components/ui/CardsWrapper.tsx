import React from "react";

interface Props {
  children: React.ReactNode;
  classesOverride?: string;
}

export const CardsWrapper: React.FC<Props> = ({
  children,
  classesOverride,
}) => {
  return (
    <div className={`flex flex-wrap gap-4 my-4 ${classesOverride}`}>
      {children}
    </div>
  );
};
