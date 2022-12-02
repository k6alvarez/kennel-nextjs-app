import Link from "next/link";
import React from "react";
import { Content } from "../ui-kit/Base";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { CheckCircleOutlined } from "@ant-design/icons";

export const PrivateLessons = () => {
  return (
    <Content>
      <h1>Private Lessons</h1>
      <BlockQuote large>
        <CheckCircleOutlined />
        <p>Our Best Service</p>
      </BlockQuote>
      <p>
        One on one instruction provided at our training center. From puppy head
        start through advanced obedience. We will help you to design a program
        that meets your needs.
      </p>
      <BlockQuote>
        <p>
          The advantage of private training is that it entails one-on-one
          instruction and that distractions can be minimized. The truth is that
          the best way to train a dog is initially with few or no distractions,
          and then distractions are gradually added as the dog learns, building
          on successful responses.
        </p>
      </BlockQuote>
      <p>
        The other advantage of private lessons is that the instructor will teach
        your dog each new command while you observe. When your dog responds to
        the instructor he is turned over to you and direct instruction ensures
        that he also responds to you. It is then your responsibility to practice
        with your dog throughout the week so that he is ready to progress to the
        next lesson. Another advantage of private lessons is that the training
        is tailored to fit your needs and we can usually teach much more than we
        can accomplish is a group format.
      </p>
      <p>
        A six week private lesson course is $600.00 and each lesson lasts
        between 1 and 1.5 hours.
      </p>
      <p>
        Interested in private lessons?{" "}
        <Link href="/contact">
          <a>Contact Us.</a>
        </Link>
      </p>
    </Content>
  );
};
