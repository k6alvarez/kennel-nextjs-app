import { createGlobalStyle } from "styled-components";
import {
  light,
  dark,
  livelySoothing,
  naturalEarth,
} from "../components/ui-kit/Theme";

export const themesMap = {
  light,
  livelySoothing,
  naturalEarth,
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

    .ant-collapse {
      margin-top: ${({ theme }) => theme.space[4]};
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
    resize: vertical;

    &::placeholder {
      color: ${({ theme }) => theme.colors.inputPlaceholder};
    }
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
    z-index: 5001;
  }

  .ant-tabs-content-holder article {
    max-width: 100%;
  }

  .ant-collapse, .ant-empty {
    font-size: inherit;
    font-family: inherit;
  }

  .ant-card-meta-title {
    text-transform: capitalize;
  }

  .ant-avatar-string {
    text-transform: uppercase;
  }

  .ant-drawer {
    z-index: 5001
  }

  .ant-drawer .rightNav {
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }

  .ant-card,  
  .ant-card-head-title {
    font-size: unset;
  }

  .ant-card-cover {
    padding: ${({ theme }) => theme.space[4]};
  }

  .ant-card-head-title {
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }

  .ant-tag {
    padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
    font-family: "Lato", sans-serif;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
    font-size: inherit;
    margin-top: ${({ theme }) => theme.space[3]};
    width: max-content;
    align-self: flex-start;
  }

  .ant-checkbox {
    display: flex;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  .ant-checkbox-inner {
    transform: scale(1.5);
    transform-origin: top;
  }

`;
