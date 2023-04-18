import { Checkbox, Image, message } from "antd";
import {
  Field,
  StyledLabel,
  StyledInput,
  Hint,
  StyledSelect,
  PreviewWrapper,
} from "./styles";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
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
    const [focused, setFocused] = useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
    const hintProps = useSpring({
      opacity: focused ? 1 : 0,
      transform: focused ? "translateY(0px)" : "translateY(5px)",
      config: { mass: 1, tension: 500, friction: 50 },
    });
    const field = state[key];
    const onChange = (e) => {
      if (e.target.id === "isClosed") {
        return handleChange(key, e.target.checked);
      } else {
        return handleChange(key, e.target.value);
      }
    };

    const autoFocus = i === 0 && !field?.cancelAutoFocus;
    const requiredField = field?.required || false;

    let imgLoading = false;

    if (field?.hidden) {
      return <input type="hidden" name={key} value={field?.value} />;
    }

    return (
      <Field key={key} grow={field?.grow}>
        {field?.type !== "checkbox" && (
          <StyledLabel htmlFor={key} error={field?.error || false}>
            {`${field?.label}${field?.required ? "*" : ""}`}
            {focused && field?.hint && (
              <animated.div style={hintProps}>
                <Hint variant="neutral">({field?.hint})</Hint>
              </animated.div>
            )}
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
            onFocus={onFocus}
            onBlur={onBlur}
            step="600"
          />
        )}

        {field?.type !== "textarea" &&
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
              onFocus={onFocus}
              onBlur={onBlur}
              hidden={field?.hidden}
            />
          )}

        {field?.error && <Hint>{field?.error}</Hint>}
      </Field>
    );
  });
};
