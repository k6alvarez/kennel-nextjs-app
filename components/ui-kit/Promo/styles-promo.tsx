import styled from "styled-components";

export const PromoWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
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

export const PromoText = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  max-width: 80vw;
  margin-top: ${({ theme }) => theme.space[2]};
  p {
    width: 100%;
    text-align: center;
  }

  .shield {
    transform: scale(0.6);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    .shield {
      transform: scale(0.7);
    }
  }
`;

export const PromoTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[4]};
  letter-spacing: 1px;
  line-height: 1;
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: ${({ theme }) => theme.fontSizes[6]};
  }
`;
