import { createGlobalStyle } from "styled-components";
import { light, dark } from "../components/ui-kit/Theme";

export const themesMap = {
  light,
  dark,
};

export const GlobalStyle = createGlobalStyle`
  form, fieldset {
    display: flex;
    flex-direction: column ;
  }

  fieldset {
    max-width: 100%;
    margin: 0 auto;

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      max-width: 40vw;
    }

  }

  main, section, article {
    max-width: 100%;
  }

  input, textarea, label, select {
    font-family: ${({ theme }) => theme.fonts.body};
    padding: ${({ theme }) => theme.space[2]};
    border-width: initial;
    width: 100%;
    border-radius: 3px;

    &:disabled {
      background-color: ${({ theme }) => theme.colors.inputDisabled};
      cursor: not-allowed;
    }
  }

  textarea {
    max-width: 80vw;
    max-height:20vh;
    resize: vertical;
  }

  label {
    margin-top: ${({ theme }) => theme.space[3]};
    line-height: 1;
    padding-left: 0;
    white-space: nowrap;
  }

  input[type="submit"] {
    margin-top: ${({ theme }) => theme.space[4]};
    padding: ${({ theme }) => theme.space[3]};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    width: max-content;
    min-width: 100px;
  }

  .ant-message {
    font-family: ${({ theme }) => theme.fonts.body};
  }

  .ant-tabs-content-holder article {
    max-width: 100%;
  }

  .ant-collapse {
    font-size: inherit;
  }
`;