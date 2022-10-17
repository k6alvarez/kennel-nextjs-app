import React from "react";

export const PetInfo = ({ pet }) => {
  return (
    <>
      {Object.keys(pet).map((key, i) => (
        <div key={key + "-" + i}>
          <strong>{key}</strong>: {pet[key]}
        </div>
      ))}
    </>
  );
};
