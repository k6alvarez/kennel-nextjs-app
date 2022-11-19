import React from "react";
import { renderFormFields } from "../Forms/renderFormFields";

export const ReservationSummary = ({ state }) => {
  return (
    <div>
      <h2>Reservation Summary</h2>
      {Object.keys(state).map((key, i) => {
        const field = state[key];

        if (!field.value) return null;

        return (
          <div key={key + "-" + i}>
            <label>{field.label}</label>

            {key === "pets" ? (
              <ul>
                {Object.entries(field).map(([petId, pet], i) => {
                  return (
                    petId !== "id" &&
                    petId !== "createdAt" &&
                    petId !== "updatedAt" &&
                    petId !== "largeImage" &&
                    petId !== "vaccinationsLargeImage" && (
                      <li key={petId + "-" + i}>
                        <label>{petId}</label>
                        <p>{pet}</p>
                      </li>
                    )
                  );
                })}
              </ul>
            ) : (
              <p>{field.value}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
