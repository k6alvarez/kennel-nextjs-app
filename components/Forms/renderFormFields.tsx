import { Image } from "antd";
import {
  Field,
  StyledLabel,
  StyledInput,
  Hint,
  StyledTextarea,
  StyledSelect,
  PreviewWrapper,
} from "./styles";

interface InputProps
  extends React.InputHTMLAttributes<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > {
  inputMode: any;
  value: string;
  error: string;
  type: any;
  min: string;
  minLength: number;
  maxLength: number;
  pattern: string;
  label: string;
  required: boolean;
  grow: boolean;
  options: string[];
  disabled: boolean;
  placeholder?: string;
  rows?: string;
  maxWidth?: string;
}

export interface renderFormFieldProps {
  initialState: { [s: string]: unknown } | ArrayLike<unknown>;
  state: {
    [x: string]: InputProps;
  };
  handleChange: (arg0: string, arg1: any) => any;
  setFormLoading?: (arg0: boolean) => any;
}

export const renderFormFields = ({
  initialState,
  state,
  handleChange,
  setFormLoading,
}: renderFormFieldProps) => {
  return Object.entries(initialState).map(([key, _value], i) => {
    const field = state[key];
    const onChange = (e) => handleChange(key, e.target.value);

    const autoFocus = i === 0;
    const requiredField = field?.required || false;

    let imgLoading = false;

    return (
      <Field key={key} grow={field?.grow}>
        <StyledLabel htmlFor={key} error={field?.error || false}>
          {`${field?.label}${field?.required ? "*" : ""}`}
        </StyledLabel>

        {field?.type === "file" && (
          <>
            <StyledInput
              type={field?.type}
              name={key}
              id={key}
              onChange={async (e) => {
                e.preventDefault();
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "gk-app");
                setFormLoading && setFormLoading(true);
                imgLoading = true;
                const data = await fetch(
                  "https://api.cloudinary.com/v1_1/dhcv2fdfq/image/upload",
                  {
                    method: "POST",
                    body: formData,
                  }
                ).then((res) => res.json());
                handleChange(key, data.secure_url);
                setFormLoading && setFormLoading(false);
                imgLoading = false;
              }}
              error={field?.error || false}
              required={requiredField}
              disabled={field?.disabled}
              accept="image/* , .pdf"
            />

            <PreviewWrapper>
              {imgLoading && (
                <Image
                  src="/images/loading.gif"
                  alt="loading"
                  width={50}
                  height={50}
                />
              )}
              {field?.value && !field?.value.endsWith("pdf") && (
                <Image
                  src={field?.value}
                  alt="Picture of the author"
                  width={200}
                  height={200}
                />
              )}
              {field?.value && field?.value.endsWith("pdf") && (
                <a href={field?.value} target="_blank">
                  PDF Uploaded - Click to View
                </a>
              )}
            </PreviewWrapper>
          </>
        )}

        {field?.type === "textarea" && (
          <StyledTextarea
            onChange={onChange}
            value={field?.value}
            id={key}
            autoFocus={autoFocus}
            error={field?.error}
            disabled={field?.disabled}
            placeholder={field?.placeholder}
            rows={field?.rows}
            maxWidth={field?.maxWidth}
          />
        )}

        {field?.type === "select" && (
          <StyledSelect
            autoFocus={autoFocus}
            id={key}
            name={key}
            onChange={onChange}
            error={field?.error}
            defaultValue={field?.value}
            disabled={field?.disabled}
          >
            {field?.options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </StyledSelect>
        )}

        {field?.type !== "textarea" &&
          field?.type !== "select" &&
          field?.type !== "file" && (
            <StyledInput
              autoFocus={autoFocus}
              onChange={onChange}
              type={field?.type || "text"}
              inputMode={field?.inputMode || "text"}
              minLength={field?.minLength}
              maxLength={field?.maxLength}
              min={field?.min}
              pattern={field?.pattern}
              required={requiredField}
              id={key}
              value={field?.value}
              error={field?.error}
              disabled={field?.disabled}
            />
          )}

        {field?.error && <Hint>{field?.error}</Hint>}
      </Field>
    );
  });
};
