import { Button, Space } from "antd";
import { InputMachine } from "./InputMachine";

type FormProps = {
  formAction: (payload: FormData) => void;
  inputs: any[];
  loading: boolean;
  defaultInputValues?: any;
  btnWrapperClasses?: string;
  renderBtnText?: (loading: boolean) => string;
  renderCancelBtnText?: (loading: boolean) => string;
  onCanceled?: () => void;
};

export const Form: React.FC<FormProps> = ({
  formAction,
  inputs,
  loading,
  defaultInputValues,
  btnWrapperClasses = "col-span-2 flex justify-center md:justify-end",
  renderBtnText = (loading) => (loading ? "Saving..." : "Save Changes"),
  renderCancelBtnText = (loading) => (loading ? "Canceling..." : "Cancel"),
  onCanceled,
}) => {
  return (
    <form
      action={formAction}
      className={`flex flex-col md:grid md:grid-cols-2 gap-4`}
    >
      <InputMachine inputs={inputs} defaultInputValues={defaultInputValues} />
      <Space className={`${btnWrapperClasses}`}>
        {onCanceled && (
          <Button
            size="large"
            type="default"
            className={`col-span-2 mx-auto`}
            onClick={() => {
              onCanceled();
            }}
          >
            <span>{renderCancelBtnText(loading)}</span>
          </Button>
        )}
        <Button
          size="large"
          loading={loading}
          htmlType="submit"
          type="primary"
          className={`col-span-2 mx-auto`}
        >
          <span>{renderBtnText(loading)}</span>
        </Button>
      </Space>
    </form>
  );
};
