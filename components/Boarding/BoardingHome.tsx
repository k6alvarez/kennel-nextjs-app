import React from "react";
import { Card } from "antd";

import styled from "styled-components";
import { Content } from "../ui-kit/Base";

export const FlexCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.secondary};

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }

  .ant-card {
    flex: 1;
    margin-bottom: 0;
    min-width: 25%;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      width: max-content;
    }
  }
`;

export const TabContent = styled(Content)`
  padding-top: 0;
  padding-bottom: 0;
`;

export const BoardingHome = () => {
  return (
    <>
      <TabContent>
        <h1>Boarding</h1>
        <p>
          We constructed our modern boarding facility in 1998 to fill a need
          made evident by an overwhelming number of requests from clients who
          attended our obedience training classes. The facility, centrally
          located between Kalamazoo and Battle Creek, provides a serene country
          atmosphere while remaining close, convenient, and easy to access.
        </p>

        <h2>Main Kennel</h2>
        <p>
          All kennel runs contain both inside and outside areas. The inside is
          heated to keep your dog warm in the winter and air-conditioned for the
          hot summer days.
        </p>
        <p>
          The boarding kennel contains three size runs to accommodate both large
          and small breeds.
        </p>
        <FlexCards>
          <Card title={<h2>Giant Run</h2>}>
            <p>
              Inside: <br />
              5ft x 6ft
            </p>
            <p>
              Outside: <br />
              5ft x 15ft outside.{" "}
            </p>
          </Card>
          <Card title={<h2>Large Run</h2>}>
            <p>
              Inside:
              <br /> 4ft x 6ft
            </p>
            <p>
              Outside:
              <br /> 4ft x 15ft outside.{" "}
            </p>
          </Card>
          <Card title={<h2>Small Run</h2>}>
            <p>
              Inside:
              <br /> 3ft x 6ft
            </p>
            <p>
              Outside:
              <br /> 3ft x 15ft outside.{" "}
            </p>
          </Card>
        </FlexCards>
        <p>
          Dogs have free access to the inside and outside areas from early
          morning to late evening (weather permitting). The runs are seperated
          by galvanized steel panels on the inside and outside to prevent cross
          contamination. The outside runs are also covered to keep dogs dry when
          it rains while providing access to fresh air and the inside runs
          include in floor radiant heat.
        </p>
        {/* <RunSizes /> */}
        <h2>C-Wing: Our Original Kennel (Updated 2020)</h2>
        <p>
          C-Wing is not connected to our main facility. After check-in our staff
          will walk pets over to their run and bring along their belongings.
        </p>
        <p>
          Runs in our C-Wing kennel contain both inside and outside areas. The
          inside is heated to keep your dog warm in the winter and
          air-conditioned for the hot summer days. Dogs have free access to the
          inside and outside areas from early morning to late evening (weather
          permitting).
        </p>
        <p>
          The C-Wing kennel contains two size runs to accommodate both large and
          small breeds.
        </p>
        <FlexCards>
          <Card title={<h2>Large Run</h2>}>
            <p>
              Inside:
              <br /> 4ft x 4.5ft
            </p>
            <p>
              Outside:
              <br /> 4ft x 15ft outside.{" "}
            </p>
          </Card>
          <Card title={<h2>Small Run</h2>}>
            <p>
              Inside:
              <br /> 3ft x 4.5ft
            </p>
            <p>
              Outside:
              <br /> 3ft x 15ft outside.{" "}
            </p>
          </Card>
        </FlexCards>
        <p>
          Three-foot high four-inch block walls and chain link fencing separate
          each individual inside area. Chain link fencing that sits on a curb to
          prevent cross contamination during cleaning and disinfecting separates
          the outside runs. The outside runs are also covered to keep dogs dry
          when it rains while providing access to fresh air. This kennel is used
          as our overflow kennel.
        </p>
        {/* <BoardingRates />
      <HolidayPremiumDates /> */}
        <h3>More Info</h3>
        <p>
          Our facility also has two spacious exercise and play areas surfaced
          with pea stones. Pea stones are an ideal surface for exercise areas
          because they are easy on dogs’ paws yet enable us to maintain a
          sanitary facility. Clients who want extra special attention given to
          their companions can take advantage of the Special Services that we
          offer.
        </p>
        <p>
          We adhere the highest standards of canine care. Our facility is
          cleaned and disinfected daily and all dogs are treated with kindness
          and respect. We are proud of the excellent reputation that our kennel
          has gained and invite you to call for a tour today.
        </p>
      </TabContent>
    </>
  );
};
