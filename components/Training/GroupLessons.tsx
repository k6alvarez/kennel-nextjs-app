import React from "react";
import { TabContent } from "../Boarding/BoardingHome";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";

export const GroupLessons = () => {
  return (
    <TabContent>
      <p>
        Group training is ideal for individuals who want to save money and
        socialize their pets. Our small group size (12 dogs) enables us to give
        you individual attention. Classes are held once a week and each class
        lasts approximately 1.5 hours. Enrollments are assigned on a first
        received basis.
      </p>
      <h1>Puppy Head Start</h1>

      <p>
        Puppy socialization is paramount to raising a well adjusted puppy.
        Covers comprehensive problem solving and prevention, housebreaking, and
        a fun introduction to obedience commands. Positive reinforcement is
        emphasized! Flat buckle collars are used (absolutely no choke chains,
        pinch collars, or head collars!). For puppies 8 to 16 weeks old.
      </p>
      <BlockQuote>
        First class attendance is required. Please DO NOT bring puppy to first
        class.
      </BlockQuote>
      <h1>Basic Obedience</h1>
      <p>
        Help your dog to unleash his/her potential by attending basic obedience
        training. This course is offered to dogs five months and up. Lessons
        include general problem solving/orientation, sit/stay, attention
        training, heel, come, down/stay, and stand/stay.
      </p>
      <p>Lessons include:</p>
      <ul>
        <li>General problem solving/orientation</li>
        <li>Sit/Stay</li>
        <li>Attention training</li>
        <li>Heel </li>
        <li>Come </li>
        <li>Down/Stay </li>
        <li>Stand/Stay </li>
        <li>Review/Practice/Graduation</li>
      </ul>
      <BlockQuote>
        First class attendance is required. Please DO NOT bring dog to first
        class.
      </BlockQuote>

      <h1>Intermediate Obedience</h1>
      <p>
        Prerequisite: enrolled dog and owner must have attended Gillette’s Basic
        Obedience or receive Instructor's approval. Teach your dog advanced
        commands and get him/her ready for off-lead. Lessons include sit hand
        signal, down hand signal, finish, stand in motion, stand for
        examination, control center, stationary watch, moving watch, and
        discrimination training.
      </p>
      <p>Lessons Include:</p>
      <ul>
        <li>Sit hand signal</li>
        <li>Down hand signal</li>
        <li>Finish</li>
        <li>Stand in motion</li>
        <li>Stand for examination</li>
        <li>Control Center</li>
        <li>Stationary Watch</li>
        <li>Moving Watch</li>
        <li>Discrimination Training</li>
      </ul>
      <BlockQuote>Please bring dog to first class.</BlockQuote>
      <h1>Advanced Obedience</h1>
      <p>
        Prerequisite: enrolled dog and owner must have attended Gillette’s Basic
        Obedience or higher. Introduce advanced exercises and obtain off-lead
        control. E-collar optional.
      </p>
      <BlockQuote>Please bring dog to first class.</BlockQuote>
    </TabContent>
  );
};
