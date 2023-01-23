import { Card } from "antd";
import React from "react";
import { FlexCards } from "./styles";

export const rateHoliday = (2.0).toFixed(2);
export const rateDogRoommate = (18.0).toFixed(2);
export const rateSmRun = (25.0).toFixed(2);
export const rateLglRun = (27.0).toFixed(2);
export const rateGiantRun = (32.0).toFixed(2);
export const rateCatCondo = (19.0).toFixed(2);
export const rateCatRoom = (23.0).toFixed(2);
export const rateCatRoommate = (16.0).toFixed(2);

export const rateMedicalCare = (0.5).toFixed(2);

const BoardingRates = ({ catsOnly = false }) => {
  return (
    <FlexCards>
      {!catsOnly && (
        <>
          <Card title={<h2>Small Run</h2>}>
            <p>
              Daily Rates: <br />${rateSmRun}
            </p>
            <p>
              Each Roommate Daily Rate: <br />${rateDogRoommate}
            </p>
            <p>
              Holiday Rates: <br />
              Add ${rateHoliday} per pet per day
            </p>
          </Card>

          <Card title={<h2>Large Run</h2>}>
            <p>
              Daily Rates: <br />${rateLglRun}
            </p>
            <p>
              Each Roommate Daily Rate: <br />${rateDogRoommate}
            </p>
            <p>
              Holiday Rates: <br />
              Add ${rateHoliday} per pet per day
            </p>
          </Card>
          <Card title={<h2>Giant Run</h2>}>
            <p>
              Daily Rates: <br />${rateGiantRun}
            </p>
            <p>
              Each Roommate Daily Rate: <br />${rateDogRoommate}
            </p>
            <p>
              Holiday Rates: <br />
              Add ${rateHoliday} per pet per day
            </p>
          </Card>
        </>
      )}
      <Card title={<h2>Cat Condo</h2>}>
        <p>
          Daily Rates: <br />${rateCatCondo}
        </p>
        <p>
          Each Roommate Daily Rate: <br />${rateCatRoommate}
        </p>
      </Card>

      <Card title={<h2>Cat Room</h2>}>
        <p>
          Daily Rates: <br />${rateCatRoom}
        </p>
        <p>
          Each Roommate Daily Rate: <br />${rateCatRoommate}
        </p>
      </Card>
    </FlexCards>
  );
};

export default BoardingRates;
