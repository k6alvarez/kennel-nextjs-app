import { InfoCircleOutlined } from "@ant-design/icons";
import React from "react";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { Content } from "../ui-kit/Base";

export const BoardingSchool = () => {
  return (
    <Content>
      <h1>Boarding School</h1>
      <p>
        Let us train your dog for you! Want a trained dog but just too busy to
        do it yourself? Boarding school may be the answer.
      </p>
      <p>
        This service is ideal for the busy dog owner or the family on vacation.
        We use a humane, motivational approach to training dogs.
      </p>
      <BlockQuote>
        <InfoCircleOutlined />
        <p>
          This is not shock collar training! Using a combination of praise,
          encouragement and correction we teach your dog each new command and
          get reliable responses through consistent repetition.
        </p>
      </BlockQuote>
      <p>
        Does this service really work? YES! Providing that you follow through
        with the training. We offer two follow through options:
        <ul>
          <li>
            One private handling lesson at pick up, and another private lesson
            two weeks later. Additional private lessons can be purchased at a
            nominal fee.
          </li>
          <li>
            One private handling lesson at pick up and a discounted group
            course. I recommend this option, as it tends to be more
            comprehensive. Remember, boarding school is a good fit for anyone
            who truly makes a commitment and follows through.
          </li>
        </ul>
      </p>
      <h2>Basic Obedience Boarding School</h2>
      <p>
        This fourteen day course is offered to dogs that are five months old or
        older. During his stay your dog will learn:
        <ul>
          <li>
            Problem Solving - inappropriate behaviors (e.g, jumping, mouthing,
            door dashing, etc.) that can occur in the kennel enviornment are
            eliminated
          </li>
          <li>
            Leave it/Take it - dog will leave an object and focus on handler
            when commanded{" "}
          </li>
          <li>Sit-Stay - reliable around INTENSE distractions </li>

          <li>
            Attention Training - dog attends to the handler and ignores other
            stimulation{" "}
          </li>

          <li>Heel - walking on a loose leash in heel position </li>

          <li>Come - comes to the handler when called </li>
          <li>Down-Stay - will lie down to a verbal command </li>
          <li>Down at a Distance - will respond several yards away </li>
          <li>
            {" "}
            Down Hand Signal - will respond to hand signal at a distance{" "}
          </li>
          <li>
            Stand-Stay - will hold a standing position when commanded *other
            exercises are frequently mastered when working with outstanding
            canine students.
          </li>
        </ul>
      </p>
      <p>
        Follow though options include: A) One private handling lesson at pick
        up, and another private lesson two weeks later. Additional private
        lessons can be purchased if necessary. B) One private handling lesson at
        pick up and a discounted eight week group course. I highly recommend
        this option as it is much more comprehensive. The Cost of this service
        is $1150.00 and includes one of the follow through options described
        above.
      </p>
      <p>
        Basic Training Boarding School is offered to dogs five months or older.
        Your dog will be boarded and trained for 14 days and the cost is
        $1150.00.
      </p>
    </Content>
  );
};
