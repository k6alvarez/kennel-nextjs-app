import React from "react";
import { Content } from "../ui-kit/Base";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { Promos } from "../ui-kit/Promo/Promos";
import { defaultDelay } from "../ui-kit/Promo";
import { InfoCircleOutlined } from "@ant-design/icons";

export const TrainingHome = () => {
  return (
    <>
      <Content>
        <h1>Gillette Kennels Obedience Training</h1>
        <p>
          Kirk L. Gillette holds a M.A. in Behavioral Psychology from Western
          Michigan University, a diploma from West Virginia Canine College, and
          two certifications from Cornell University Canine Study Program. Mr.
          Gillette, who is a member of the Association for Behavioral Analysis
          and the International Association of Canine Professionals, continues
          to lead the way in conscientious dog training and client education.
        </p>
        <BlockQuote large>
          <InfoCircleOutlined />
          <p>
            Our classes range from puppy head start classes to basic,
            intermediate, and advanced levels!
          </p>
        </BlockQuote>
        <p>New class schedule and tuition costs coming soon!</p>
        <Promos
          delay={defaultDelay * 6}
          promos={[
            {
              title: "Group Lessons",
              description:
                "Ideal for individuals who want to save money and socialize their pets.",
              link: "/training?tab=group-lessons",
              image:
                "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419343/gk-app/Kitty_window.jpg",
            },
            {
              title: "Private Lessons",
              description:
                "One on one instruction at our training center. Our Best Service.",
              link: "/training?tab=private-lessons",
              image:
                "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419325/gk-app/Addie3.jpg",
            },
          ]}
        />
        <Promos
          delay={defaultDelay * 6}
          promos={[
            {
              title: "Agility",
              link: "/training?tab=agility",
              description:
                "Fun for owners and dogs, agility training is a great way to bond.",
              image:
                "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005807/gk-app/gkrun.jpg",
            },
            {
              title: "Consultations",
              link: "/training?tab=consultations",
              description:
                "Having special problems with your dog? We can help!",
              image:
                "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005807/gk-app/gkrun.jpg",
            },
          ]}
        />

        {/* <ClassList
          dateCheck={(x) => {
            return DateTime.local() < DateTime.fromISO(x.startDate);
          }}
        /> */}
      </Content>
    </>
  );
};
