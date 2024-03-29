import { Checkbox, Image, Radio, message } from "antd";
import {
  Field,
  StyledLabel,
  StyledInput,
  Hint,
  StyledSelect,
  PreviewWrapper,
  RadioGroup,
} from "./styles";
import { Editor } from "@tiptap/react";
import { Tiptap } from "../ui-kit/Tiptap";

export interface InputProps
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
  cancelAutoFocus?: boolean;
  hint?: string;
  hidden?: boolean;
}

export interface renderFormFieldProps {
  initialState: { [s: string]: unknown } | ArrayLike<unknown>;
  state: {
    [x: string]: InputProps;
  };
  handleChange: (arg0: string, arg1: any) => any;
  setFormLoading?: (arg0: boolean) => any;
  editor?: Editor;
}

export const renderFormFields = ({
  initialState,
  state,
  handleChange,
  setFormLoading = () => {},
  editor = null,
}: renderFormFieldProps) => {
  return Object.entries(initialState).map(([key, _value], i) => {
    const field = state[key];
    const onChange = (e) => {
      if (e.target.id === "isClosed") {
        return handleChange(key, e.target.checked);
      } else {
        return handleChange(key, e.target.value);
      }
    };

    const autoFocus = i === 0 && !field?.cancelAutoFocus;
    const requiredIfImageMissingValue =
      field?.type === "image" && !field?.value;
    const requiredField = field?.required || false;

    const getOptionsIfRadio = () => {
      if (field?.type === "radio") {
        return field?.options?.map((option, i) => (
          <label key={i}>
            <StyledInput
              type="radio"
              name={key}
              value={option}
              onChange={onChange}
              required={requiredField}
              checked={field?.value === option}
            />
            {option}
          </label>
        ));
      }
    };

    let imgLoading = false;

    if (field?.hidden) {
      return <input type="hidden" name={key} value={field?.value} />;
    }

    return (
      <Field key={key} grow={field?.grow} radio={field?.type === "radio"}>
        {field?.type !== "checkbox" && (
          <StyledLabel htmlFor={key} error={field?.error || false}>
            {`${field?.label}${field?.required ? "*" : ""}`}
            {field?.hint && <Hint variant="neutral">({field?.hint})</Hint>}
          </StyledLabel>
        )}

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

                message.loading(`Uploading your ${field.label} file.`);
                const data = await fetch(
                  "https://api.cloudinary.com/v1_1/dhcv2fdfq/image/upload",
                  {
                    method: "POST",
                    body: formData,
                  }
                ).then((res) => res.json());

                if (data?.error?.message) {
                  message.error(data?.error.message);
                  setFormLoading && setFormLoading(false);
                  imgLoading = false;
                  return;
                } else {
                  handleChange(key, data.secure_url);
                  setFormLoading && setFormLoading(false);
                  imgLoading = false;
                  message.success(
                    `Successfully uploaded your ${field.label} file.`
                  );
                }
              }}
              error={field?.error || false}
              required={requiredField && requiredIfImageMissingValue}
              disabled={field?.disabled || imgLoading}
              accept="image/* , .pdf"
            />

            {field?.value && (
              <PreviewWrapper>
                {!field?.value.endsWith("pdf") && (
                  <Image
                    src={field?.value}
                    alt={`Picture of ${field?.label}`}
                    width={200}
                    height={200}
                  />
                )}
                {field?.value.endsWith("pdf") && (
                  <a href={field?.value} target="_blank">
                    PDF Uploaded - Click to View
                  </a>
                )}
              </PreviewWrapper>
            )}
          </>
        )}

        {field?.type === "textarea" && (
          <textarea
            id={key}
            name={key}
            onChange={onChange}
            required={requiredField}
            value={field?.value}
            rows={Number(field?.rows) || 4}
            placeholder={field?.placeholder}
            disabled={field?.disabled}
          />
        )}

        {field?.type === "tipTapEditor" && (
          <Tiptap
            content={editor}
            onchange={(html) => handleChange(key, html)}
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

        {field?.type === "checkbox" && (
          <Checkbox id={key} onChange={onChange} disabled={field?.disabled}>
            {`${field?.label}${field?.required ? "*" : ""}`}
          </Checkbox>
        )}

        {field?.type === "time" && (
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
            step="600"
          />
        )}

        {field?.type === "radio" && (
          <RadioGroup>{getOptionsIfRadio()}</RadioGroup>
        )}

        {field?.type !== "radio" &&
          field?.type !== "tipTapEditor" &&
          field?.type !== "textarea" &&
          field?.type !== "select" &&
          field?.type !== "file" &&
          field?.type !== "checkbox" &&
          field?.type !== "time" && (
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
              hidden={field?.hidden}
            />
          )}

        {field?.error && <Hint>{field?.error}</Hint>}
      </Field>
    );
  });
};
