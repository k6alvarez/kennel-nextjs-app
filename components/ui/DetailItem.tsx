type Props = {
  label: string;
  value: string;
};
export const DetailItem = ({ label, value }: Props) => {
  return (
    <div className="flex justify-around w-full">
      <div className="flex flex-col items-center">
        <div className="text-base text-gray-500 capitalize">{label}</div>
        <div className="text-lg font-medium">{value}</div>
      </div>
    </div>
  );
};
