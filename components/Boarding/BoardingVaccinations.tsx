import Link from "next/link";
import React from "react";
import { BlockQuote } from "../Reservations/NewClients/FormIntro";

export const BoardingVaccinations = () => {
  return (
    <>
      <h4>BOARDING VACCINATIONS</h4>
      <p>All dogs must have a current history of vaccinations that include:</p>
      <ul>
        <li>Distemper: Vaccination given within the last one (1) year)</li>
        <li>Parvo-Virus: Vaccination given within the last one (1) year</li>
        <li>
          Rabies: Vaccination given within the last one (1) year on dogs under
          one (1) year of age and within the last three (3) years for dogs over
          one (1) year of age
        </li>
        <li>
          Bordetella: This is the most important vaccination for dogs being
          boarded! We absolutely require Bordetella vaccination prior to entry
          of any dog into our kennel. If you would like more information about
          kennel cough please see our{" "}
          <Link href="/boarding?activeTab=Medical Issues">
            <a>Medical Issues</a>
          </Link>{" "}
          section.
        </li>
      </ul>
      <h4>TRAINING VACCINATIONS</h4>
      <p>All dogs must have a current history of vaccinations that include:</p>
      <ul>
        <li>Distemper: Vaccination given within the last one (1) year)</li>
        <li>Parvo-Virus: Vaccination given within the last one (1) year</li>
        <li>
          Rabies: Vaccination given within the last one (1) year on dogs under
          one (1) year of age and within the last three (3) years for dogs over
          one (1) year of age. Because many veterinarians to not give the rabies
          vaccination to young puppies, rabies is not required for puppy head
          start.
        </li>
        <li>
          Bordetella: This is the vaccination for kennel cough. It is required
          for training classes and is for your dog's protection. If you would
          like more information about kennel cough please see our{" "}
          <Link href="/boarding?activeTab=Medical Issues">
            <a>Medical Issues</a>
          </Link>{" "}
          section.
        </li>
      </ul>
      <BlockQuote>
        <p>
          Veterinarian provided proof of vaccinations must be provided prior to
          your dog’s initial stay. We must obtain a copy of records that we can
          keep on file. Our records must be updated annually. Vaccination
          records can be uploaded, mailed or faxed to us at (269) 665-6970.
        </p>
      </BlockQuote>
    </>
  );
};