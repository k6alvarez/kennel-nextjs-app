import Link from "next/link";
import React from "react";
import { BlockQuote } from "../Reservations/NewClients/FormIntro";

export const BoardingCheckin = () => {
  return (
    <>
      {" "}
      <BlockQuote>
        When arriving to check-in please park in the large asphalt parking lot
        located at 9172 East K Ave. Please enter the kennel reception room
        through the OFFICE ENTRANCE and follow the Check-In Procedure outlined
        below.
      </BlockQuote>
      <h2>Check-In Procedure</h2>
      <ol>
        <li>Please leave your pet in your vehicle while you check-in.</li>
        <li>
          Bring in your pet’s bedding, food, and/or toys.{" "}
          <b>(Limit: 3 items per pet, label all items)</b>
        </li>
        <li>Complete paperwork for check-in.</li>
        <li>
          Leash-walk your dog to the dog-walk area to eliminate (area located on
          right side of building next to fire hydrant). Please DO NOT allow your
          dog to urinate on our plants or building.
        </li>
        <li>
          An employee will meet you at the gate by the dog walk area and add the{" "}
          <Link href="/policies?name=Pet Detect">
            <a>Pet Detect</a>
          </Link>{" "}
          tag onto your pet.
        </li>
        <li>
          Your dog must be leashed at all times. If you forget your leash, we
          will loan one to you.
        </li>
      </ol>
      <p>
        Because our kennel is very open, clients that arrive to drop-off or
        pick-up boarding dogs will frequently see staff members engaging in
        activities such as cleaning and disinfecting, exercising or obedience
        training dogs, teaching private lessons, and teaching classes. We also
        frequently hire independent contractors to help us to maintain the
        grounds. All staff members and individuals on the premises are not
        qualified to check clients in and out, so please be sure to enter the
        reception area through the OFFICE ENTRANCE. A doorbell will
        automatically sound when the OFFICE ENTRANCE door is opened and a
        qualified staff member will immediately service you.
      </p>
      <h2>More Info</h2>
      <p>
        Again, please remember to leash your dog before you let him/her out of
        your car. It is also important that the leash be attached to a properly
        fitted collar. A flat collar must fit snug around the dog’s neck. You
        should be able to place only two fingers between your dog’s neck and
        collar. The collar must not be so loose that it pulls over your dog’s
        head. It is also important that the collar contain your dog’s tags. The
        law requires that your dog be licensed and that his current tags be
        securely attached to the collar.
      </p>
      <p>
        We also recommend that you take your dog for a brief potty walk as soon
        as you get him/her out of your vehicle. The designated dog walk area is
        conveniently located next to the parking area.
      </p>
      <p>
        Our boarding services are computerized with state-of-the-art boarding
        kennel software. The kennel software enables us to keep accurate records
        of all of our boarding clients important information. It also helps us
        to book reservations, accurately calculate charges, and streamlines
        arrival (check-in) and departure (check-out) activities. When checking
        in please be prepared to verify the scheduled departure date, the name
        of your veterinarian's clinic, and your dog’s name, age, and breed.
        Also, please provide us with feeding guidelines, a contact telephone
        number (where you can be reached), your dog's medication schedule (if
        applicable), and indicate which <a>Special Services</a> you would like
        for us to provide for your dog. Please be sure to thoroughly read, sign,
        and date the boarding agreement.
      </p>
      <p>
        Please check our kennels <a>Policies</a> and Hours before you board your
        pet with us. We strive to develop and maintain an excellent relationship
        with our clients. This relationship must be built on mutual respect and
        consideration.
      </p>
    </>
  );
};
