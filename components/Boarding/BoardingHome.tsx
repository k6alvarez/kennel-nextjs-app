import { InfoCircleOutlined } from "@ant-design/icons";
import React from "react";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { RunSizes, RunSizesCWing } from "./RunSizes";
import { Content } from "../ui-kit/Base";

export const BoardingHome = () => {
  return (
    <>
      <Content>
        <h1>Boarding</h1>
        <p>
          We constructed our modern boarding facility in 1998 to fill a need
          made evident by an overwhelming number of requests from clients who
          attended our obedience training classes. The facility, centrally
          located between Kalamazoo and Battle Creek, provides a serene country
          atmosphere while remaining close, convenient, and easy to access.
        </p>
        <p>
          Our facility also has two spacious exercise and play areas surfaced
          with pea stones. Pea stones are an ideal surface for exercise areas
          because they are easy on dogs' paws yet enable us to maintain a
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
        <BlockQuote large>
          <InfoCircleOutlined />
          <p>
            Dogs have free access to the inside and outside areas from early
            morning to late evening (weather permitting). The runs are seperated
            by galvanized steel panels on the inside and outside to prevent
            cross contamination. The outside runs are also covered to keep dogs
            dry when it rains while providing access to fresh air and the inside
            runs include in floor radiant heat.
          </p>
        </BlockQuote>
      </Content>
      <RunSizes />
      <Content>
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
        <BlockQuote large>
          <InfoCircleOutlined />
          <p>
            Three-foot high four-inch block walls and chain link fencing
            separate each individual inside area. Chain link fencing that sits
            on a curb to prevent cross contamination during cleaning and
            disinfecting separates the outside runs. The outside runs are also
            covered to keep dogs dry when it rains while providing access to
            fresh air. This kennel is used as our overflow kennel.
          </p>
        </BlockQuote>
        <RunSizesCWing />
      </Content>
    </>
  );
};
