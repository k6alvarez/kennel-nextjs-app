import React from "react";
import { TabContent } from "../Boarding/BoardingHome";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";

export const TrainingHome = () => {
  return (
    <TabContent>
      <p>
        Kirk L. Gillette holds a M.A. in Behavioral Psychology from Western
        Michigan University, a diploma from West Virginia Canine College, and
        two certifications from Cornell University Canine Study Program. Mr.
        Gillette, who is a member of the Association for Behavioral Analysis and
        the International Association of Canine Professionals, continues to lead
        the way in conscientious dog training and client education.
      </p>
      <BlockQuote>
        Our classes range from puppy head start classes to basic, intermediate,
        and advanced levels!
      </BlockQuote>
      {/* <ClassList
          dateCheck={(x) => {
            return DateTime.local() < DateTime.fromISO(x.startDate);
          }}
        /> */}
    </TabContent>
  );
};
