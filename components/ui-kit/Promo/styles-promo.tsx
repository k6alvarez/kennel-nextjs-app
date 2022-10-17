import styled from "styled-components";

export const PromoWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: 1.2;

  p {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }
`;

export const PromoPics = styled.div`
  flex: 1;
  width: 100%;
`;

export const PromoTitleWrapper = styled.div`
  width: calc(100% - 100px);
  float: right;
  text-align: center;
  flex: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: 100%;
  }
`;

export const PromoText = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 80vw;
  margin-top: ${({ theme }) => theme.space[2]};

  .shield {
    position: absolute;
    top: -15px;
    left: -55px;
    transform: scale(0.35);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    .shield {
      position: relative;
      top: 5px;
      transform: scale(0.65);
    }
  }
`;

export const PromoTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[3]};
  letter-spacing: 1px;
  line-height: 1;
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: ${({ theme }) => theme.fontSizes[6]};
  }
`;
