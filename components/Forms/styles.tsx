import styled from "styled-components";

export const EditForm = styled.form`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 80vw;
  margin: ${({ theme }) => theme.space[4]} 0;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: grid;
    grid-template-columns: ${({ gridColumns }) =>
      gridColumns ? gridColumns : "1fr 1fr"};
  }
`;

export const Fieldset = styled.fieldset`
  width: 100%;
  max-width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    max-width: 70%;
  }
`;

export const PreviewWrapper = styled.div`
  margin: ${({ theme }) => theme.space[4]} 0;
  font-size: ${({ theme }) => theme.fontSizes[0]};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => (align ? align : "center")};
  width: ${({ setWidth }) => (setWidth ? setWidth : "calc(100% - 1rem)")};
  grid-column: ${({ grow }) => (grow ? "span 2" : "auto")};
`;

export const Hint = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes[0]};
  width: 100%;
  padding: ${({ theme }) => theme.space[2]} 0;
`;

export const StyledInput = styled.input`
  font-size: ${({ theme }) => theme.fontSizes[1]};
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.primary : theme.colors.textSecondary};
  &:focus {
    border-color: ${({ theme }) => theme.colors.inputFocus};
  }

  &:hover:not(:disabled) {
    cursor: pointer;
  }

  ::-webkit-file-upload-button {
    font-size: ${({ theme }) => theme.fontSizes[0]};
  }
`;

export const StyledLabel = styled.label`
  color: ${({ theme, error }) =>
    error ? theme.colors.primary : theme.colors.textSecondary};

  &:hover:not(:disabled) {
    cursor: pointer;
  }
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.space[2]} 0;
  margin: ${({ theme }) => theme.space[2]};
`;

export const StyledTextarea = styled.textarea`
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  align-self: flex-start;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.primary : theme.colors.textSecondary};
  &:focus {
    border-color: ${({ theme }) => theme.colors.inputFocus};
  }
  &:hover:not(:disabled) {
    cursor: pointer;
  }
`;
export const StyledSelect = styled.select`
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.primary : theme.colors.textSecondary};
  &:focus {
    border-color: ${({ theme }) => theme.colors.inputFocus};
  }
  &:hover:not(:disabled) {
    cursor: pointer;
  }
`;
