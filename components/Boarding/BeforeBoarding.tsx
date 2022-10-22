import Link from "next/link";
import React from "react";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { TabContent } from "./BoardingHome";

export const BeforeBoarding = () => {
  return (
    <TabContent>
      <h1>Before Boarding</h1>
      <p>
        Our experience has shown us that dogs that frequently visit our boarding
        kennel from puppy hood absolutely love coming here. It is like their
        home away from home. Many older dogs (five years or older) that have
        never before been boarded have a hard time adjusting to the kennel
        atmosphere.
      </p>
      <BlockQuote large>
        It is extremely important to socialize your dog to a boarding kennel at
        a young age.
      </BlockQuote>
      <p>
        We suggest that individuals who have older dogs that have not been
        socialized to a kennel begin with a very short stay (a day or two) to
        let them get used to the kennel environment. We also suggest that
        individuals who have geriatric dogs (10 years or older) that have never
        been boarded before consider using an in home pet sitting service.
      </p>

      <p>
        We encourage you to take a tour of our facility before you board with
        us. We prefer to provide tours on Sundays during our regular Business
        Hours; however, we will attempt to accommodate your schedule to make
        special arrangements if Sunday doesn't work for you.
      </p>
      <p>
        Feel free to bring your dog's favorite toys and/or treats. Please limit
        the number of toys to three items and label all toys clearly with your
        dog's first and your last name. In addition, we feel it is important
        that your dog have a clean, comfortable bed to sleep on; however, we
        have instituted strict bedding requirements. Bedding is also now
        available from us for a nominal daily rental fee.{" "}
        <a>Please see Special Services: Bedding.</a>
      </p>
      <p>
        Clients who feed a different food than Iam’s and Iam’s Eukanuba products
        are encouraged to provide us with food, as a sudden change in diet can
        result in diarrhea. Please see our{" "}
        <Link href="/boarding?activeTab=Medical Issues">
          <a>Medical Issues</a>
        </Link>{" "}
        page for more information. Clients who provide us with food must present
        the food to us as described in our <a>Food Policy</a>.
      </p>
      <p>
        All dogs must be up-to-date on their vaccinations. We require copies of
        shot records that we can keep on file. Please review our{" "}
        <Link href="/boarding?activeTab=Vaccinations">
          <a>Vaccinations</a>
        </Link>{" "}
        page.
      </p>
      <p>
        If you decide to use our kennel please be advised that all dogs MUST be
        leashed when on the premises. This is important because other clients
        will be coming and going with their dogs, and we are frequently
        providing obedience training lessons on the property. For safety
        purposes please remember to bring your dog on a leash. If you arrive at
        the kennel without a leash please leave your dog in your vehicle while
        you borrow a leash from us. Please read our{" "}
        <a>procedures for checking in</a> prior to your arrival.
      </p>
    </TabContent>
  );
};
