import { Switch } from "antd";
import EditorInput from "./EditorInput";
import ImageUpload from "./ImageUpload";

export const InputMachine = ({
  inputs,
  defaultInputValues,
}: {
  inputs: any[];
  defaultInputValues?: any;
}) => {
  return (
    <>
      {inputs.map(
        (
          {
            name,
            label,
            type,
            options,
            required,
            disabled,
            readonly,
            hidden = false,
          },
          i
        ) => (
          <div
            key={name + "-" + i}
            className={`mx-auto w-[400px] max-w-full ${
              type === "editor" && "col-span-2 w-[80vw]"
            }`}
          >
            {hidden ? (
              <input
                defaultValue={
                  (defaultInputValues && defaultInputValues[name]) || ""
                }
                id={name}
                name={name}
                type={"hidden"}
                required={required}
                disabled={disabled}
                className="mt-1 block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-400 text-primary shadow-sm sm:text-sm"
              />
            ) : (
              <>
                <label
                  htmlFor={name}
                  className="block text-base md:text-lg w-full"
                >
                  {label}
                  {required && <span className="text-red-500">*</span>}
                </label>
                {type === "textarea" && (
                  <textarea
                    name={name}
                    id={name}
                    rows={8}
                    className="mt-1 block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-400 text-primary shadow-sm sm:text-sm"
                    defaultValue={
                      (defaultInputValues && defaultInputValues[name]) || ""
                    }
                    required={required}
                    disabled={disabled}
                  />
                )}

                {type === "switch" && (
                  <>
                    <Switch
                      defaultChecked={
                        (defaultInputValues && defaultInputValues[name]) ||
                        false
                      }
                      onChange={(checked: boolean) => {
                        const input = document.querySelector(
                          `input[name=${name}]`
                        );
                        if (input) {
                          input.setAttribute("value", checked.toString());
                        }
                      }}
                      disabled={disabled}
                      className="mt-[0.7rem]"
                    />
                    <input
                      type="hidden"
                      name={name}
                      value={
                        (defaultInputValues && defaultInputValues[name]) ||
                        false
                      }
                    />
                  </>
                )}

                {type === "number" && (
                  <input
                    defaultValue={
                      (defaultInputValues && defaultInputValues[name]) || 0
                    }
                    id={name}
                    name={name}
                    type={type}
                    required={required}
                    disabled={disabled}
                    className="mt-1 block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-400 text-primary shadow-sm sm:text-sm"
                  />
                )}

                {type === "select" && (
                  <select
                    required={required}
                    disabled={disabled}
                    name={name}
                    id={name}
                    className="mt-1 block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-400 text-primary shadow-sm sm:text-sm"
                  >
                    {options.map(
                      (
                        { value, label }: { value: string; label: string },
                        i: string
                      ) => (
                        <option key={value + "-" + i} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                )}
                {type === "radio" && (
                  <div className="flex flex-col">
                    {options.map(
                      (
                        { value, label }: { value: string; label: string },
                        i: string
                      ) => (
                        <label
                          key={value + "-" + i}
                          className="flex items-center"
                        >
                          <input
                            type="radio"
                            name={name}
                            value={value}
                            required={required}
                            disabled={disabled}
                            className="form-radio h-5 w-5 text-primary"
                          />
                          <span className="ml-2 text-black text-base">
                            {label}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                )}
                {type === "editor" && (
                  <div>
                    <EditorInput
                      content={
                        (defaultInputValues && defaultInputValues[name]) || ""
                      }
                      onChange={(e: {
                        target: { name: string; value: string };
                      }) => {
                        const input = document.querySelector(
                          `input[name=${name}]`
                        );
                        if (input) {
                          input.setAttribute("value", e.target.value);
                        }
                      }}
                      id={name}
                    />
                    <input
                      type="hidden"
                      name={name}
                      value={
                        (defaultInputValues && defaultInputValues[name]) ||
                        false
                      }
                    />
                  </div>
                )}
                {type === "image" && (
                  <ImageUpload
                    name={name}
                    defaultInputValues={defaultInputValues}
                  />
                )}
                {(type === "text" ||
                  type === "email" ||
                  type === "date" ||
                  type === "time") && (
                  <input
                    defaultValue={
                      (defaultInputValues && defaultInputValues[name]) || ""
                    }
                    id={name}
                    name={name}
                    type={type}
                    required={required}
                    disabled={disabled}
                    readOnly={readonly}
                    className="mt-1 block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-400 text-primary shadow-sm sm:text-sm"
                  />
                )}
              </>
            )}
          </div>
        )
      )}
    </>
  );
};
