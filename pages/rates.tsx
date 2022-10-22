import React from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import Link from "next/link";

import Layout from "../components/Layout";
import { PostProps } from "../components/Post";
import { Content } from "../components/ui-kit/Base";
import { BlockQuote } from "../components/Reservations/GuestClients/FormIntro";
import BoardingRates, {
  rateDogRoommate,
  rateGiantRun,
  rateHoliday,
  rateLglRun,
  rateSmRun,
} from "../components/Boarding/BoardingRates";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Rates: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Content>
        <h1>Boarding Rates</h1>
        <p>
          Boarding charges are calculated by day, similar to human hotels,
          clients are charged for a full day the day/night they check their pet
          in, regardless of the check in time. Clients who check out by or
          before our check out time (11:00 AM) on normal business days will not
          be charged for that day. Clients who check out after 11:00 AM are
          charged for the full day.
        </p>
        <p>
          Most clients pay when they pick their pets up, however, you can choose
          to pre-pay when you arrive. We accept credit and debit cards, cash,
          personal checks, and travelers checks.
        </p>
        <p>
          Also similar to human hotels that charge more for larger rooms,
          boarding clients are charged for the size of the run rented. We
          presently offer three size kennel runs. Small runs housing a single
          dog are rented for ${rateSmRun} per day and large runs housing a
          single dog are rented for ${rateLglRun} per day. Giant (extra large)
          runs housing a single dog are rented for ${rateGiantRun} per day.
          Other per day or per incident charges may apply. For example, holiday
          rates are ${rateHoliday} per day more than the normal daily rate.
        </p>
        <BlockQuote large>
          <p>
            Clients who check out by or before 11:00 AM on normal business days
            will not be charged for that day
          </p>
        </BlockQuote>
        <BoardingRates />
        <h2>You may also be charged for:</h2>
        <ul>
          <li>
            <Link href="/boarding?tab=medical-issues">
              <a>Special medical attention</a>
            </Link>
          </li>
          <li>
            <Link href="/policies?tab=feeding">
              <a>Special food preparation or additional feedings</a>
            </Link>
          </li>

          <li>
            <Link href="/boarding?tab=special-services">
              <a>Special services</a>
            </Link>
          </li>
          <li>
            <a href="http://gillettekennels.com/gk-staging/policies/bedding/">
              laundry service fee
            </a>
          </li>
          <li>
            <a href="http://gillettekennels.com/gk-staging/policies/after-hours-service-policy/">
              after hours service
            </a>
          </li>
          <li>
            <a href="http://gillettekennels.com/gk-staging/holiday-and-premium-dates/">
              holiday rates
            </a>
          </li>
        </ul>
        {/* <HolidayRates /> */}

        <h1>Discounts</h1>
        <BlockQuote large>
          <p>
            We offer discounts for multiple pets belonging to the same family
            when the dogs stay in the same run.
          </p>
        </BlockQuote>
        <p>
          We charge the daily rate for the run plus ${rateDogRoommate} extra per
          roommate. For example, the charge for a large run used to house three
          small dogs will be $
          {(
            parseInt(rateLglRun) +
            parseInt(rateDogRoommate) +
            parseInt(rateDogRoommate)
          ).toFixed(2)}{" "}
          per day ($
          {rateLglRun} + ${rateDogRoommate} + ${rateDogRoommate}). A small run
          used to house three small dogs will be $
          {(
            parseInt(rateSmRun) +
            parseInt(rateDogRoommate) +
            parseInt(rateDogRoommate)
          ).toFixed(2)}{" "}
          per day ($
          {rateSmRun} + ${rateDogRoommate} + ${rateDogRoommate}). A large run
          used to house two large dogs will be ${" "}
          {(parseInt(rateSmRun) + parseInt(rateDogRoommate)).toFixed(2)} per day
          ($
          {rateLglRun} + ${rateDogRoommate}). Premium and holiday rates will be
          applied to discounted dogs should the dog occupy a run during these
          dates.
        </p>
        <p>
          Gillette Kennels reserves the right to determine if dogs housed in the
          same run are suited for multi-pet accommodations. When pets are
          extremely active, aggressive, or messy, it is not to their benefit to
          house them together. Our primary concern is the comfort, health, and
          well-being of pets in our care. Overcrowding, (boarding too many dogs
          together) is an invitation to health and sanitation problems that we
          make every effort to prevent. Under no circumstances will we board
          more that three small dogs or two large dogs (over 40 LBS) in a single
          run.
        </p>
        <p>
          We also offer a 10% discount to clients who board a dog for an
          extended stay. An extended stay is defined as 30 consecutive days or
          more. The 10% discount applies to boarding rates ONLY, and does not
          extend to “special services.” Clients who contract for an extended
          stay must prepay 50% of the boarding charge. Any client that contracts
          for an extended stay and picks-up early will be charged the lesser of
          the entire discounted booked reservation, or the present daily rate
          for entire period that the dog was boarded. We will also charge our
          daily rate for any additional days that a discounted dog is boarded
          after the scheduled departure date. Premium and holiday rates will be
          applied to discounted dogs should the dog occupy a run during these
          dates.
        </p>
      </Content>
    </Layout>
  );
};

export default Rates;
