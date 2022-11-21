import {
  AlertOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";
import React from "react";
import styled from "styled-components";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { Content } from "../ui-kit/Base";
import { rateMedicalCare } from "./BoardingRates";

const { Panel } = Collapse;

export const BoldText = styled.span`
  font-weight: 600;
`;

export const Accordion = styled.div`
  border-top: 1px solid ${(props) => props.theme.lightGrey};
  margin-bottom: 1rem;
`;

export const MedicalIssues = () => {
  return (
    <Content>
      <h1>Medical Issues</h1>
      <p>Select a topic to learn about each of our medical policies.</p>
      <Collapse defaultActiveKey={["1"]}>
        <Panel key={1} header="Administering Medications">
          <p>
            We will administer veterinarian prescribed medications to your dog
            as part of our daily kennel routine. Specific provisions have been
            made to accurately administer and record the passing of meds. We
            will not charge extra for the single administration of simple
            medications (e.g., passing a pill). However, should your dog require
            more extensive medical care (e.g., ear drops, eye drops, etc.), you
            will be charged {rateMedicalCare} cents for each administration.
          </p>
        </Panel>
        <Panel key={2} header="Diarrhea">
          <p>
            Diarrhea is uncommon at our kennel but it does occur. Although most
            dogs never get diarrhea while being boarded, others get it every
            time they are boarded. Occasionally a dog that has had firm stools
            here will get diarrhea when he/she returns home. What can cause this
            sudden onset of gastric distress?
          </p>
          <p>
            <BoldText>Stress Related Diarrhea:</BoldText> We believe that the
            most common cause of diarrhea is “Stress.” This cause of diarrhea
            most frequently occurs with dogs who have never been boarded or who
            are infrequently boarded. The sudden change in the dog’s routine
            causes them to stress out and the result can be gastric distress.
            This is also why dogs that have had firm stools here may develop
            diarrhea when they return home. It is the change in environment that
            causes the stress.
          </p>
          <p>
            <BoldText>Dietary Change:</BoldText> Another cause of diarrhea is
            due to a sudden change in diet. This sudden dietary change is
            compounded by the stress of being boarded and the result can be
            diarrhea. This type of diarrhea can usually be avoided by providing
            us with your dog’s food. Clients who feed a different food than
            quality Iam’s products are recommended to provide their dog’s food.
            Please see our page that describes our Food Policy.
          </p>
          <BlockQuote>
            <InfoCircleOutlined />
            <p>
              If diarrhea is noticed during boarding your veterinarian will be
              contacted and treatment guidelines will be followed. You will be
              informed of your veterinarian recommended treatment at the time of
              checkout. If diarrhea should occur after you return home be sure
              to tell your veterinarian that your dog was recently boarded with
              us. Given that the strict guidelines are followed for daily
              cleaning and disinfecting of our kennel, it is unlikely that the
              diarrhea is caused by something other than dietary changes and
              stress.
            </p>
          </BlockQuote>
        </Panel>
        <Panel header="Dog Injuries and Illnesses" key={3}>
          <p>
            If your dog becomes ill or injured while being boarded with us we
            will, at our sole discretion, engage the services of your
            veterinarian. Any expenses incurred as a result of veterinarian
            services must be paid at the time of check out. Please carefully
            read our Injured Dog Policy.
          </p>
          <p>
            While we make every effort to ensure that our kennel is a safe place
            for even the most exuberant dog, we will not be held liable in the
            event that your dog injures itself. Please carefully read our
            Destructive Dog Policy.
          </p>
        </Panel>
        <Panel header="Flea Control" key={4}>
          <p>
            Because our kennel and grounds are frequently treated with a variety
            of dog-safe flea and tick control products, we have never had a flea
            infestation on the premises. Therefore, it is very unlikely that
            your dog will become infested with fleas while being boarded at our
            kennel. However, it is still possible. Please check for the presence
            of fleas before you drop your dog off at our kennel and immediately
            after you check your dog out.
          </p>
          <BlockQuote>
            <InfoCircleOutlined />
            <p>
              In addition, please tell us if your dog has had a recent flea
              infestation so that we can check for the reappearance of the
              parasite. We feel that it is extremely important that we be
              notified if your dog was treated “dipped” within a week of being
              boarded.
            </p>
          </BlockQuote>
          <p>
            Although dips are a very effective treatment, they only kill the
            fleas that are present when the dog is being treated. All too
            frequently owners neglect to treat the entire environment and
            re-infestation occurs. The point is that if you treated your dog and
            did not treat your entire environment, it is likely that your dog
            has become re-infested and will need another treatment. If this
            occurs, we will need to treat your dog as well as the entire kennel
            and grounds.{" "}
          </p>
          <BlockQuote large>
            <AlertOutlined />
            <p>Please tell us if your dog was recently infested.</p>
          </BlockQuote>
          <p>
            Also, please contact us immediately if you believe that your dog
            became infested with fleas while being boarded with us.
          </p>
          <p>
            We also feel that it is an excellent idea that you use preventative
            measures to help control for fleas. Please ask your veterinarian
            about products such as Program or Sentinel.
          </p>
        </Panel>
        <Panel header="Geriatric Dogs" key={5}>
          <p>
            Over the years we have had many clients who have boarded geriatric
            dogs that are in failing health. In each situation we have felt that
            it was important to ask the question, “What do you want us to do if
            your dog should pass away?” It would be an unfortunate situation if
            a geriatric dog were to pass away while being boarded, however, it
            is a real possibility. Should the situation arise we feel that it is
            extremely important that we know exactly what the owner wants us to
            do. Clients who board geriatric dogs must provide us with precise
            information as to the procedure to follow should their dog pass.
          </p>
        </Panel>
        <Panel header="Kennel Cough" key={6}>
          <p>
            It is important that all clients are made aware that Kennel Cough is
            present always in South West Michigan and does not originate in a
            kennel.
          </p>
          <BlockQuote large>
            <InfoCircleOutlined />{" "}
            <p>
              We absolutely will not allow dogs in our facility that are
              coughing or showing signs of kennel cough. However, it may be
              impossible for us to tell when a boarder has been exposed to
              kennel cough prior to his/her arrival.
            </p>
          </BlockQuote>

          <p>
            We require that all dogs that enter our kennel have been properly
            vaccinated and that the owners provide us with written proof.
            Records must be updated annually.
          </p>
          <p>
            Kennel Cough, akin to a “doggy cold,” is a generic term used to
            indicate canine infectious tracheobronchitis, a highly infectious
            upper respiratory disease that is caused from a number of bacteria
            such as Bordetella bronchiseptica, and viruses such as canine
            parainfluenza. Coughing, sneezing, and nasal discharge are common
            symptoms of kennel cough. These symptoms can last from a few days to
            several weeks. Since it is a viral infection, there is no “cure,”
            just as there is no cure for the common cold. As a self-limiting
            disease, it will go away on its own, just like any other cold or
            flu. However, many veterinarians will prescribe a cough suppressant
            or an antibiotic to prevent secondary infections.
          </p>
          <p>
            Kennel cough is not “born” in the kennel, it can be (and usually is)
            “caught” outside the kennel and brought in by a boarder. A dog can
            be exposed at the park, grooming shop, pet store, veterinary office,
            walking around the neighborhood, or any place where dogs congregate
            or pass through.
          </p>
          <BlockQuote>
            <InfoCircleOutlined />
            <p>
              Kennel cough is not unique to a kennel, therefore; the more
              appropriate term is canine cough.
              <br /> Unfortunately, canine cough usually does not show visible
              symptoms for 5-7 days after exposure.{" "}
            </p>
          </BlockQuote>
          <p>
            While we make intense efforts to prevent an outbreak in our kennel
            through extensive cleaning and disinfecting, public awareness, and
            by requiring vaccinations, we cannot guarantee that your dog will
            not be exposed.
          </p>
          <p>
            Just as a child who attends school has the potential to contract a
            cold or the flu, which is seasonal, a dog being boarded also has the
            potential to contract canine cough, which is also seasonal. When a
            child gets a cold or the flu parents do not expect the school system
            to pay for treatment. Similarly, if a dog gets canine cough in our
            kennel, you should not expect us to cover the cost of treatment.
            Through our efforts, the possibility of your dog’s exposure to
            canine cough in our kennel is minimal, however; it is still
            possible. Please be advised that if exposure to canine cough does
            occur, the kennel will not be held liable for its treatment, cost
            thereof, or consequences.
          </p>
          <BlockQuote large>
            <AlertOutlined />
            <p>
              {" "}
              Again, we make every effort to prevent an outbreak of canine
              cough!
              <br />
              All dogs are required to be up-to-date on all vaccinations,
              including Bordetella; therefore, clients who board their dogs with
              us do so at their own risk.
            </p>
          </BlockQuote>
        </Panel>
      </Collapse>
    </Content>
  );
};
