import React from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";
import { PostProps } from "../components/Post";
import { Content } from "../components/ui-kit/Base";
import { BlockQuote } from "../components/Reservations/NewClients/FormIntro";

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
        {/* <BoardingRates /> */}
        {/* <HolidayRates /> */}

        <h1>Rates</h1>
        <BlockQuote>
          <p>
            Clients who check out by or before 11:00 AM on normal business days
            will not be charged for that day
          </p>
        </BlockQuote>
        <p>
          Boarding charges are calculated by day, similar to human hotels,
          clients are charged for a full day the day/night they check their pet
          in, regardless of the check in time. Clients who check out by or
          before our check out time (11:00 AM) on normal business days will not
          be charged for that day. Clients who check out after 11:00 AM are
          charged for the full day. Most clients pay when they pick their pets
          up, however, you can choose to pre-pay when you arrive. We accept
          cash, personal checks, and travelers checks.
        </p>
        <p>
          <strong>We accept credit and debit cards.</strong>
        </p>
        <p>
          Also similar to human hotels that charge more for larger rooms,
          boarding clients are charged for the size of the run rented. We
          presently offer three size kennel runs. Small runs housing a single
          dog are rented for $20.oo per day and large runs housing a single dog
          are rented for $22.00 per day. Giant (extra large) runs housing a
          single dog are rented for $26.00 per day. Other per day or per
          incident charges may apply. For example, holiday rates are $1.00 per
          day more than the normal daily rate. You may also be charged for:
        </p>
        <ul>
          {/* <li>
              <a href="http://gillettekennels.com/gk-staging/medical-issues/administering-medications/">
                special medical attention
              </a>
            </li>
            <li>
              <a href="http://gillettekennels.com/gk-staging/policies/feeding/">
                special food preparation
              </a>
            </li>
            <li>
              <a href="http://gillettekennels.com/gk-staging/policies/feeding/">
                additional feedings
              </a>
            </li>
            <li>
              <a href="http://gillettekennels.com/gk-staging/boarding/special-services/">
                special services
              </a>
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
            </li> */}
        </ul>
        <h1>Discounts</h1>
        <BlockQuote>
          <p>
            We offer DISCOUNTS for multiple pets belonging to the same family
            WHEN the dogs stay in the same run.
          </p>
        </BlockQuote>
        <p>
          We charge the daily rate for the run plus $12.00 extra per roommate.
          For example, the charge for a large run used to house three small dogs
          will be $47.00 per day ($23.00 + $12.00+$12.00). A small run used to
          house three small dogs will be $45.00 per day ($21.00+$12.00+$12.00).
          A large run used to house two large dogs will be $32.00 per day
          ($20.00+$12.00). Premium and holiday rates will be applied to
          discounted dogs should the dog occupy a run during these dates.
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
