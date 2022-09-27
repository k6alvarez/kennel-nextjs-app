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
    const {
      inputMode,
      value,
      error,
      type,
      min,
      minLength,
      maxLength,
      pattern,
      label,
      required,
      grow,
      options,
      disabled = false,
    } = state[key];
    const onChange = (e) => handleChange(key, e.target.value);
    const autoFocus = i === 0;
    const requiredField = required || false;
    return (
      <Field key={key} grow={grow}>
        <StyledLabel htmlFor={key} error={error || false}>
          {`${label}${required ? "*" : ""}`}
        </StyledLabel>
        {type === "textarea" && (
          <StyledTextarea
            onChange={onChange}
            value={value}
            id={key}
            autoFocus={autoFocus}
            error={error}
            disabled={disabled}
          />
        )}

        {type === "select" && (
          <StyledSelect
            autoFocus={autoFocus}
            id={key}
            name={key}
            onChange={onChange}
            error={error}
            defaultValue={value}
            disabled={disabled}
          >
            {options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </StyledSelect>
        )}

        {type !== "textarea" && type !== "select" && (
          <StyledInput
            autoFocus={autoFocus}
            onChange={onChange}
            type={type || "text"}
            inputMode={inputMode || "text"}
            minLength={minLength}
            maxLength={maxLength}
            min={min}
            pattern={pattern}
            required={requiredField}
            id={key}
            value={value}
            error={error}
            disabled={disabled}
          />
        )}

        {error && <Hint>{error}</Hint>}
      </Field>
    );
  });
};
