import Link from "next/link";
import React from "react";
import { Content } from "../ui-kit/Base";

export const AgilityLessons = () => {
  return (
    <Content>
      <p>
        Agility Training Fun for owners and dogs. Your dog will learn how to
        negotiate jumps, tunnels, and obstacles. Unlimited practice time during
        scheduled course hours (while enrolled in class).
      </p>
      <p>
        Contact us for more information, or view our{" "}
        <Link href="/training">
          <a>class schedule</a>
        </Link>{" "}
        for upcoming classes.
      </p>
      {/* <GeneralContactForm
        emailSubject={"Gillette Kennels Agility Training Contact"}
        formHint="Learn more about Agility Training using the form below."
      /> */}
    </Content>
  );
};
