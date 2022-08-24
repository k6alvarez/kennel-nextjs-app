import styled from "styled-components";

export const Fields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 1rem);
  grid-column: ${({ grow }) => (grow ? "span 2" : "auto")};
`;

export const StepsAction = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
`;
export const StepsContent = styled.div`
  width: 100%;
`;

export const Hint = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes[0]};
  width: 100%;
  padding: ${({ theme }) => theme.space[2]} 0;
`;

export const StyledInput = styled.input`
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.primary : theme.colors.textSecondary};
  &:focus {
    border-color: ${({ theme }) => theme.colors.inputFocus};
  }
`;

export const StyledLabel = styled.label`
  color: ${({ theme, error }) =>
    error ? theme.colors.primary : theme.colors.textSecondary};
`;