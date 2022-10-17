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
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }
`;

export const PromoPics = styled.div`
  flex: 1;
  width: 100%;
`;

export const PromoTitleWrapper = styled.div`
  width: 100%;
  float: right;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space[4]};
  flex: 1;
`;

export const PromoText = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80vw;
  margin-top: ${({ theme }) => theme.space[2]};

  .shield {
    transform: scale(0.65);
    margin-bottom: -15px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

export const PromoTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[3]};
  letter-spacing: 1px;
  line-height: 1;
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: ${({ theme }) => theme.fontSizes[6]};
  }
`;
