import React from "react";
import Link from "next/link";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Carousel } from "antd";
import styled from "styled-components";
import { GridItems, GridItem, GridItemTitle } from "./Base";

const { Meta } = Card;

export const StyledMeta = styled(Meta)`
  .ant-card-meta-description,
  .ant-card-meta-title {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .ant-card-meta-title {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 600;
  }

  .ant-card-meta-description {
    font-size: ${({ theme }) => theme.fontSizes[0]};
    font-family: ${({ theme }) => theme.fonts.body};
  }
`;

export const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.primary};
  min-width: 30%;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => `${theme.space[5]} ${theme.space[4]}`};
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding: ${({ theme }) => `${theme.space[6]} ${theme.space[5]}`};
  }
`;

export const StyledGridItems = styled(GridItems)`
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

export const Callouts = ({ callouts = [] }) => {
  return (
    <Wrapper>
      <StyledGridItems as="div">
        {callouts.map((callout, i) => (
          <StyledCard
            key={callout + "-" + i}
            hoverable
            cover={<img alt={callout.title} src={callout.image} />}
          >
            <Link href={callout.link} key={callout.title}>
              <>
                <StyledMeta
                  title={callout.title}
                  description={callout.description}
                />
              </>
            </Link>
          </StyledCard>
        ))}
      </StyledGridItems>
    </Wrapper>
  );
};
