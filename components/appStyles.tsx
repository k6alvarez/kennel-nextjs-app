import { createGlobalStyle, css } from "styled-components";
import {
  light,
  dark,
  livelySoothing,
  naturalEarth,
} from "../components/ui-kit/Theme";
import { headerHt, promoStyles } from "./ui-kit/Promo/styles-promo";

const blockquoteStyles = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-size: ${({ theme, large }) =>
    large ? theme.fontSizes[2] : theme.fontSizes[1]};
  line-height: 1.6;
  margin-top: ${(props) => props.theme.space[4]};
  margin-bottom: ${(props) => props.theme.space[4]};
  position: relative;

  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colors.secondaryDark};
  box-shadow: ${({ theme }) => theme.shadows.light};

  &::before {
    content: "";
    background: ${({ theme }) => theme.colors.primary};
    width: 3px;
    height: 100%;
    left: 0;
    position: absolute;
  }

  p {
    margin: ${(props) => props.theme.space[4]};
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes[6]};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

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
    height: 100%;

    .ant-collapse {
      margin-top: ${({ theme }) => theme.space[4]};
    }    

  }

  .ant-collapse-content-box fieldset {
    margin: 0;
    width: 100%;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    ${blockquoteStyles}
  }

  em {
    ${promoStyles}
  }

  strong {
    font-weight: bold;
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
    display: flex;
    white-space: nowrap;
    align-items: center;
    gap: ${({ theme }) => theme.space[2]};
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
    width: 100%;
  }

  .ant-drawer-header {
    background-color: ${({ theme }) => theme.colors.primary};
    min-height: ${headerHt};
    .ant-drawer-title h2, .anticon-close {
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }

  .ant-drawer-body {
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.body};

    a {
      text-align: center;      
      text-transform: uppercase;
      font-size: calc(${({ theme }) => theme.fontSizes[0]} / 1.2);
      letter-spacing: 1px;
      left: -8px;
      width: 100%;
      position: relative;
      margin: 0;
      padding: ${({ theme }) => theme.space[4]};
      border-top: 1px solid ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.textSecondary};

      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: underline;
      }
    }

    button {
      margin-top: ${({ theme }) => theme.space[0]};
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.textPrimary};
      
    }
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


  .ant-modal-content {
    font-family: ${({ theme }) => theme.fonts.body};
  }

  .ant-tag {
    padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
    font-family: "Lato", sans-serif;
    font-size: calc(${({ theme }) => theme.fontSizes[0]} / 1.6);
    font-weight: 600;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-badge {    
    font-family: "Lato", sans-serif;
    font-size: calc(${({ theme }) => theme.fontSizes[0]} / 1.6);
    font-weight: 600;
  }

  .ant-collapse-expand-icon .anticon.anticon-info-circle.ant-collapse-arrow {
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }

  .ant-collapse>.ant-collapse-item >.ant-collapse-header {
    align-items: center;
  }

  .ant-card {
    flex: 1;
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

  .ant-carousel {
    width: 100%;
  }

  .ant-list {
    margin: ${({ theme }) => theme.space[4]} 0;
  }

  .ant-list-items {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: stretch;    
  }
  
  .ant-list-bordered .ant-list-header {
    text-transform: capitalize;
    position: sticky;
    top: ${headerHt};
    background: ${({ theme }) => theme.colors.white};
    z-index: 1;
  }

  .ant-list .ant-list-item {
    flex: 1;
    white-space: nowrap;
    min-width: 100%;
    justify-content: center;
    align-items: start;
    font-size: ${({ theme }) => theme.fontSizes[0]};

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      min-width: 50%; 

      &.ant-list-50 {
        min-width: 50%;
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      min-width: 26%; 

      &.ant-list-50 {
        min-width: 50%;
      }
    } 
  }

  .virtual-table .ant-table-container:before,
  .virtual-table .ant-table-container:after {
    display: none;
  }
`;
