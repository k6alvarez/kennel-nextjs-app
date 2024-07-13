import { List } from "antd";
import Item from "antd/es/descriptions/Item";
import { GuestReservation } from "@prisma/client";

type Props = {
  reservation: GuestReservation;
  dataSource: JSX.Element[];
  header?: string | JSX.Element;
};
export const ReservationDataGroup = ({ dataSource, header }: Props) => {
  return (
    <List
      header={header}
      bordered
      dataSource={dataSource}
      renderItem={(item) => item && <Item>{item}</Item>}
    />
  );
};
