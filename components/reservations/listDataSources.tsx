import { DetailItem } from "../ui/DetailItem";

export const getReservationDetails = (
  desiredData: {
    label: string;
    value: string;
  }[]
) => {
  return desiredData.map((data) => (
    <DetailItem key={data.label} label={data.label} value={data.value} />
  ));
};
