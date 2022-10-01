import {
  Field,
  StyledLabel,
  StyledInput,
  Hint,
  StyledTextarea,
  StyledSelect,
} from "./styles";

export interface renderFormFieldProps {
  initialState: { [s: string]: unknown } | ArrayLike<unknown>;
  state: {
    [x: string]: {
      inputMode: any;
      value: any;
      error: any;
      type: any;
      min: any;
      minLength: any;
      maxLength: any;
      pattern: any;
      label: any;
      required: any;
      grow: any;
      options: any;
      disabled: boolean;
    };
  };
  handleChange: (arg0: string, arg1: any) => any;
}

export const renderFormFields = ({
  initialState,
  state,
  handleChange,
}: renderFormFieldProps) => {
  return Object.entries(initialState).map(([key, _value], i) => {
    const field = state[key];
    const onChange = (e) => handleChange(key, e.target.value);
    const autoFocus = i === 0;
    const requiredField = field.required || false;
    return (
      <Field key={key} grow={field.grow}>
        <StyledLabel htmlFor={key} error={field.error || false}>
          {`${field.label}${field.required ? "*" : ""}`}
        </StyledLabel>
        {field.type === "textarea" && (
          <StyledTextarea
            onChange={onChange}
            value={field.value}
            id={key}
            autoFocus={autoFocus}
            error={field.error}
            disabled={field.disabled}
          />
        )}

        {field.type === "select" && (
          <StyledSelect
            autoFocus={autoFocus}
            id={key}
            name={key}
            onChange={onChange}
            error={field.error}
            defaultValue={field.value}
            disabled={field.disabled}
          >
            {field.options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </StyledSelect>
        )}

        {field.type !== "textarea" && field.type !== "select" && (
          <StyledInput
            autoFocus={autoFocus}
            onChange={onChange}
            type={field.type || "text"}
            inputMode={field.inputMode || "text"}
            minLength={field.minLength}
            maxLength={field.maxLength}
            min={field.min}
            pattern={field.pattern}
            required={requiredField}
            id={key}
            value={field.value}
            error={field.error}
            disabled={field.disabled}
          />
        )}

        {field.error && <Hint>{field.error}</Hint>}
      </Field>
    );
  });
};
