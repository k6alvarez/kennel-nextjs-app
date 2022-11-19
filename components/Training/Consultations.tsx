import React from "react";
import { Content } from "../ui-kit/Base";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";

export const Consultations = () => {
  return (
    <Content>
      <p>
        <BlockQuote>
          Having special problems with your dog? We can help!
        </BlockQuote>
      </p>
      <p>
        Most behavioral problems can be changed but not always 100% “cured.” It
        really depends on many variables. A comprehensive evaluation followed by
        a private consultation will enable you to eliminate or at least reduce
        the frequency of most behavioral problems.
      </p>
      <p>
        A consultation is a meeting with you and your dog provided at my
        training center. Ninety percent of the process entails gathering
        information about your dog and his environment. After the information is
        gathered and analyzed the results are discussed and sound advice is
        offered. The consultation will take approximately 1 to 1.5 hours. The
        fee is $150.00 to be paid at the time of the consultation.
      </p>
      <p>
        If you are interested in a consultation please contact us using the form
        below. Please provide a brief description of the problem during your
        initial contact. After we receive the initial contact form we will ask
        you to fill out a comprehensive questionnaire so that we can profile
        your dog and determine the best course of action.
      </p>
      {/* <GeneralContactForm
        emailSubject="Gillette Kennels Consultation Request"
        formHint="If you are interested in a consultation please contact us using the
            form below."
        showAddress={true}
      /> */}
    </Content>
  );
};
