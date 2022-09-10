import React from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import { Collapse } from "antd";

import Layout from "../components/Layout";
import { PostProps } from "../components/Post";
import { Content } from "../components/ui-kit/Base";
import { BlockQuote } from "../components/Reservations/NewClients/FormIntro";
import { BoldText } from "../components/Boarding/MedicalIssues";

const { Panel } = Collapse;

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Policies: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Content>
        <h1>Policies</h1>
        <BlockQuote>
          <p>
            We strive to establish a friendly professional relationship with all
            of our clients. This relationship can only be built through
            effective communication and mutual respect. Many of these policies
            were implemented only after numerous serious discussions, debates,
            and research into how other kennels around the country handle these
            issues. Please help us to build a positive relationship by knowing
            our policies.
          </p>
        </BlockQuote>
        <Collapse accordion defaultActiveKey={["1"]}>
          <Panel key={1} header="Abandoned Dog Policy">
            <p>
              <BoldText>
                IT IS UNFORTUNATE THAT THIS POLICY IS NECESSARY
              </BoldText>
            </p>
            <p>
              Any dog that is not called for within ten (10) days of the
              scheduled pickup time, and the owner/agent does not notify our
              kennel of extended boarding, shall be deemed abandoned.
            </p>
            <p>
              We shall dispose of dogs that are abandoned publicly, privately,
              or otherwise. Our kennel shall have, and is hereby granted, a lien
              on the dog for any and all unpaid charges and the owner or agent
              shall remain liable for complete boarding fees as well as other
              charges incurred in the care, maintenance, and disposal of said
              dog. Our kennel may exercise its lien rights upon the first day of
              abandonment. The owner specifically waives all statutory or legal
              rights to the contrary.
            </p>
          </Panel>
          <Panel header="After Hours Service Policy" key={2}>
            <p>
              Our regular business hours are from 9:00 AM to 7:00 PM Sunday
              through Friday. We are closed on Saturday and Holidays. Special
              arrangements can be made for before or after hour drop-offs or
              pick-ups for family or medical emergencies only. A $25.00 fee will
              be charged for any drop-off or pick-up that occurs during
              non-business hours AND any such service must be prearranged. No
              service will be provided on Holidays. Also, no service will be
              provided before 8:00 AM or after 9:00 PM. Please understand that
              while we do appreciate your business, we also have a family life,
              so please don’t ask us to make exceptions to this policy.
            </p>
          </Panel>
          <Panel header="Agressive Dog Policy" key={3}>
            <p>
              An aggressive dog is defined as a dog that has bitten or injured a
              human or another dog, and/or growls, bares teeth, lunges or snaps
              at a person or dog. An aggressive dog will be allowed to be
              boarded in our kennel, however, the owner of said dog must inform
              us of the potential for injury prior to making reservations. Under
              no circumstances will an aggressive dog be provided with Special
              Services other than bedding rental. The owner of an aggressive
              will be held liable for any injury sustained to himself, another
              dog, an employee, representative, or clients of Gillette Kennels,
              and for any damage to our facility caused by said dog. Should an
              aggressive dog injure itself and be unapproachable by our staff,
              we will contact Kalamazoo Animal Control and have the dog removed
              from the premises so that it may be properly cared for.
            </p>
          </Panel>
          <Panel header="Bedding" key={4}>
            <p>
              We feel that it is an absolute must that dog(s) in our care be
              provided with clean comfortable bedding. However, this is a much
              more difficult and time consuming task than you’d suspect,
              especially when caring for multiple dogs. For example, it is not
              uncommon for a dog to soil its bedding. When this happens we must
              temporarily remove the bedding and launder it. Also, dogs
              frequently damage their beds, which necessitates mending. Worse
              yet, some dogs completely destroy their bedding. This is sometimes
              followed by the owner’s bewilderment and compliant, “my dog never
              destroyed his bedding at home.” In addition, clients sometimes
              bring bedding that is inappropriate for the kennel environment.
              Sometimes client provided bedding is too heavy and bulky to easily
              be moved while the dog’s run is being disinfected. Some client
              provided bedding is stuffed with material that is unsafe for the
              dog that may chew and ingest it. Finally, occasionally client
              provided bedding is filthy dirty, or so old and nasty that it
              disintegrates when being moved.
            </p>
            <p>
              Most client provided bedding, however, is clean, lightweight and
              easily handled. Therefore, we feel that it would be unfair and
              upsetting to many clients if we no longer allowed bedding.
              However,
            </p>
            <p>
              <BoldText>
                ALL CLIENT PROVIDED BEDDING MUST: BE CLEAN, SAFE, EASILY
                LAUNDERED OR CLEANED, LIGHTWEIGHT AND MANAGABLE, LABLED WITH THE
                DOGS NAME, AND MADE OF A SNAG FREE MATERIAL. THE BEDDING MUST
                FIT INTO THE DOGS RUN WHILE ALLOWING HIM ROOM TO EAT, DRINK AND
                MOVE AROUND. LARGE OVERSIZED HEAVY BEDDING WILL NOT BE ACCEPTED.
                KNITED OR CROCHAYED BEDS AND CARPETING WILL ALSO NOT BE
                ACCEPTED.
              </BoldText>
            </p>
            <p>
              Clients who choose to provide their own bedding will be charged a
              LAUNDRY SERVICE FEE of $1.50 PER INCIDENT should their dogs soil
              their bedding. The laundry service is required for owner provided
              bedding. We will not allow soiled bedding to remain in the kennel.
              When dogs soil client provided bedding we will launder it. We also
              do not feel comfortable returning soiled bedding to clients.
              However, when a dog soils bedding immediately before departure and
              we are forced to return it soiled, we will place it in a plastic
              bag. Clients who receive soiled bedding at departure will be
              charged the laundry service fee for each incident that the bedding
              was laundered during the dogs stay. When clients check out early
              without notification there is a possibility that the dogs bed will
              be in the laundry or returned soiled. It may seem like it is a
              small matter, but when caring for multiple dogs, laundering
              bedding can become very time-consuming. We feel that it is only
              fair that we receive compensation for the additional work required
              to launder client bedding.
            </p>
            <p>
              Clients that do not own bedding appropriate for the kennel
              environment or forget to bring their dog’s bed can rent quality
              bedding from us at a nominal fee.
            </p>
          </Panel>
          <Panel header="Destructive Dog Policy" key={5}>
            <p>
              Clients who board dogs with us that are destructive will be held
              liable for all damage caused to our kennel and any injury that the
              dog may inflict upon itself while engaging in destructive
              behaviors. This policy is applied to any and all destructive dogs
              regardless of the reason for destruction. That is, whether the dog
              has Separation Anxiety, Fear of Thunderstorms, or any phobia or
              generalized escape behavior. In addition, when clients provide us
              with a veterinarian prescribed sedative for their dogs to help to
              prevent escape behaviors, we will not be held responsible or
              liable should the sedative not be given in time to prevent
              destruction or injury! Although we will allow dogs with these
              problems to be boarded at our kennel, clients must agree to this
              policy and BOARD AT THEIR OWN RISK!
            </p>
          </Panel>
          <Panel header="Dirty Dog Policy" key={6}>
            <p>
              A dirty dog is a dog that runs through his feces immediately after
              he defecates, or defecates and urinates in the inside run or on
              his bedding. When we are aware that a dog is a “dirty dog” we will
              do our best to keep him clean by limiting his freedom to the
              outside run. However, should a dirty dog begin to stink up the
              kennel we will bathe the dog at the owner’s expense. Also, should
              a dirty dog soil client provided bedding we will launder it at the
              owner’s expense. We make every effort to keep our kennel clean and
              odor free, therefore, should a client drop off a dog that is
              overdue for a bath, and should said dog cause an unpleasant odor
              in our kennel, we will bathe the dog at the owner’s expense.
            </p>
          </Panel>
          <Panel header="Feeding" key={7}>
            <p>
              Our guests are routinely fed at 9:00 AM. Additional evening
              feedings ($.75 per meal) are available upon request. The evening
              feeding is provided at 4:00 PM. Food and water are served in our
              dishes, so please do not bring dishes.
            </p>
            <p>
              We serve quality Iam’s and Iam’s Eukanuba products. You have a
              choice of Adult Eukanuba Lamb and Rice, Puppy food, or Large Breed
              Puppy food. Clients who feed a different brand are encouraged to
              provide us with food, as a sudden change in diet can result in
              diarrhea. Please see our Medical Issues page for more information.
              If you provide food please package EACH MEAL in a *Ziploc® (type)
              plastic bag (no fold-over sandwich baggies, please) with each meal
              clearly labeled with your pet’s name. See below. Please do not
              label days/dates or AM/PM unless the meals are different. Please
              DO NOT put medications in the food bags, and please do not bag
              canned food. If you board for an extended period (14 days or more)
              you can provide food in a clean, airtight container labeled with
              your pet’s name. An unopened bag of dog food does not constitute a
              sealed container.
            </p>
          </Panel>
          <Panel header="Fence Fighters" key={8}>
            <p>
              A fence fighter is a dog that lunges, jumps, and barks at the dogs
              housed in the adjacent kennels. Fence fighters also grab the
              fencing with their teeth and stick their noses through the chain
              links. Sometimes this behavior is playful and sometimes it is
              aggressive. When we encounter fence fighters we do the best that
              we can to control this behavior. For example, we may limit the
              dog’s freedom or move the dog to another kennel. It is generally
              not possible to completely eliminate the behavior; therefore,
              should a fence fighter break a tooth, scratch its nose, or in any
              way injure itself, Gillette Kennels will not be held liable.
              Furthermore, clients who board dogs with us that are fence
              fighters will be held liable for all damage caused to our kennel
              and any injury that the dog may inflict upon itself while engaging
              in this behavior.
            </p>
          </Panel>
          <Panel header="Fence Jumpers And Climbers" key={9}>
            <p>
              Clients who board dogs that jump or climb fences must inform us at
              the time that reservations are made, and again when the dog is
              dropped off, as special arrangements must be made to house these
              dogs. We will not be held liable should the dog escape when
              clients fail to provide us with this information during
              reservations AND when the dog is checked-in. Dogs that climb or
              jump fences shall not be provided with the “exercise” service as
              exercise entails limited supervision.
            </p>
          </Panel>
          <Panel header="General Cancellation Policy" key={10}>
            <p>ALL RESERVATIONS MUST BE SECURED BY A VALID CREDIT CARD</p>
            <p>
              We require at least 48 hours notice for cancellations or
              reservation schedule changes. When we are unable to re-book the
              space that is reserved for your dog due to inadequate notice we
              will charge your credit card a $25.00 cancellation fee for each
              run reserved. Clients that fail to provide us with at least 24
              hours notice for early pick-ups will be charged for the entire
              scheduled reservation.
            </p>
          </Panel>
          <Panel header="Leashes And Tags" key={11}>
            <p>
              <BoldText>IT’S THE LAW AND OUR POLICY</BoldText>
            </p>
            <p>
              All dogs on the premises must be leashed at all times. NO
              EXCEPTIONS. It is also important that the leash be attached to a
              properly fitted collar. A flat collar must fit snug around the
              dog’s neck. You should be able to place only two fingers between
              your dog’s neck and collar. The collar must not be so loose that
              it pulls over your dog’s head. It is also important that the
              collar contain your dog’s tags.
            </p>
            <p>
              Michigan State Law requires that your dog be licensed and that his
              current tags be securely attached to the collar, which …“shall at
              all times be kept on the dog for which the license is issued,
              except when such dog is engaged in lawful hunting accompanied by
              its owner or custodian.”
            </p>
            <p>
              Under no circumstances shall your dog’s tags be attached to a
              training collar (i.e., a choke chain or a pinch collar) while
              being boarded. For safety reasons, training collars are routinely
              removed from all dogs when they are placed into the kennel run. It
              is your responsibility to present your dog to us with his/her tags
              securely attached to a properly fitted flat collar.
            </p>
          </Panel>
          <Panel header="Pet Detect" key={12}>
            <p>
              Printed identification collar bands for pets and their personal
              possessions. Allows for immediate and positive identification of
              any pet and their belongings anywhere, anytime by any staff
              member. Printed information includes pet's name, run number, meds
              information, your kennel name, and other critical data.
            </p>
          </Panel>

          <Panel header="Lost Or Damaged Items" key={13}>
            <p>
              While we do allow you to bring toys and bedding for your dog, we
              suggest that you bring not more than three toys that are clearly
              labeled with your dog’s name. Cloth toys that your dog tears up or
              shreds will be removed from the run. In addition, many clients
              prefer to leave their leashes with us when they check in. This is
              usually not a problem as the leash is clipped and hung on the
              inside run gate that is occupied by the clients dog. Occasionally,
              however, a dog will pull the leash through the fencing and chew it
              up. Therefore, clients who leave their leashes do so at their own
              risk. We will not be held responsible for any item that you leave
              at our kennel should they become damaged or lost.
            </p>
          </Panel>
          <Panel header="Premium Date and Holiday Cancellation Policy" key={14}>
            <p>
              <BoldText>
                ALL RESERVATIONS MUST BE SECURED BY A VALID CREDIT CARD
              </BoldText>
            </p>
            <p>
              All reservations made for any holiday, holiday weekend, or premium
              date require a per run $25.00 non-refundable deposit Clients that
              cancel holiday reservations without at least 5 days notice will
              automatically forfeit the deposit Clients that cancel holiday
              reservations or premium date reservatiions with less than 24 hours
              notice will be charged for the entire booked reservation.
            </p>
            <p>
              <BoldText>NO EXCEPTIONS</BoldText>
            </p>
          </Panel>
          <Panel
            header="Premium Date and Holiday Early Pick-ups or Reservation Changes"
            key={15}
          >
            <p></p>Clients who reserve space for holidays that fail to provide
            us with at least 48 hours notice for early pick-ups will be charged
            for the entire scheduled reservation. In addition, clients who make
            changes to reservations without providing us with at least 48 hours
            notice will be charged our regular daily rate for any days that the
            space reserved remains vacant. We are sorry that it has become
            necessary to implement such a strict cancellation policy; however,
            we cannot continue to incur the tremendous loss of revenue do to
            untimely cancellations, early pick-ups, and reservation schedule
            changes.
          </Panel>
          <Panel header="Reservation Cancellation Policy" key={16}>
            <p>
              Our boarding facility has limited space and is frequently at 100%
              occupancy. This forces us to turn potential boarders away. When
              clients pick-up their dogs early, cancel reservations, or change
              reservations without adequate notice (at least 48 hours), it is
              frequently too late for us to fill the space that we reserved for
              them because the boarders that we turned away have already made
              other arrangements. This causes us to lose a tremendous amount of
              income. Due to the loss of revenue as a result of no-shows,
              untimely cancellations, schedule changes, and early pick-ups, we
              have implemented the following cancellation policies.
            </p>
          </Panel>
          <Panel header="Sick And Injured Dogs" key={17}>
            <p>
              Should any dog become ill or injured while being boarded with us,
              we will, at our sole discretion, engage the services of client’s
              veterinarian. Any expenses incurred as a result of veterinarian
              services must be paid to our kennel at the time of pickup. Please
              carefully read our Destructive Dog Policy.
            </p>
            <p>
              While we make every effort to ensure that our kennel is a safe
              place for even the most exuberant dog, we will not be held liable
              in the event that a dog, for any reason, injures itself. All dogs
              are boarded or otherwise handled or cared for by us without
              liability on our part for loss or damage from disease, death,
              running away, theft, fire, injury to persons, other animals or
              property by said dog, or other unavoidable causes, due diligence
              and care having been exercised. Owner/agent agrees to pay all
              costs for any property damage or personal injury caused by his/her
              dog during its stay. All charges are due the day the dog is picked
              up. It is expressly agreed by owner and kennel that kennel’s
              liability shall in no event exceed the lesser of current chattel
              value of a dog of the same breed and quality, or the sum of
              $200.00 per dog boarded. The owner further agrees to be solely
              responsible for any and all acts or behavior of said dog while it
              is in the care of the kennel.
            </p>
          </Panel>
        </Collapse>
      </Content>
    </Layout>
  );
};

export default Policies;
