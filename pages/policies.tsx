import React, { useContext, useEffect, useState } from "react";
import { Collapse, Image } from "antd";

import Layout from "../components/Layout";
import { PostProps } from "../components/Post";
import { Content } from "../components/ui-kit/Base";
import { BlockQuote } from "../components/Reservations/GuestClients/FormIntro";

import { useRouter } from "next/router";
import Link from "next/link";
import { InfoCircleOutlined } from "@ant-design/icons";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";
import { ContentItem } from "@prisma/client";
import { saveContent } from "../components/Admin/services";
import { EditForm } from "../components/Forms/styles";
import { Tiptap } from "../components/ui-kit/Tiptap";
import { ThemePreferenceContext } from "./_app";
import { defaultContent } from ".";

const { Panel } = Collapse;

type Props = {
  feed: PostProps[];
  contentItems: string;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const page = "POLICIES";
  const contentItems = await prisma.contentItem.findMany({
    where: {
      page,
    },
  });

  return {
    props: {
      contentItems: JSON.stringify(contentItems),
    },
  };
};

const Policies: React.FC<Props> = ({ contentItems }) => {
  const router = useRouter();
  const { tab } = router.query;
  const [activeKey, setActiveKey] = useState("abandoned");
  const parsedContentItems = JSON.parse(contentItems);
  const { editMode } = useContext(ThemePreferenceContext);
  const [isLoading, setIsLoading] = useState(false);
  const [policiesContent, setPoliciesContent] = useState(
    parsedContentItems.find((item) => item.name === "policiesContent")
  );

  useEffect(() => {
    if (tab) {
      const el = document.getElementById(tab[tab.length - 1] as string);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
      setActiveKey(tab as string);
    }
  }, [tab]);

  return (
    <Layout>
      <Content>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={policiesContent?.content || { content: "" }}
              onSave={(html) => {
                setPoliciesContent({ content: html });
                saveContent({
                  apiPath: `/api/content-item/${policiesContent.id}`,
                  html,
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: policiesContent?.content }} />
        )}

        <Collapse
          activeKey={activeKey}
          onChange={(key) => {
            router.replace(
              {
                pathname: "/policies",
                query: { tab: key },
              },
              undefined,
              { shallow: true }
            );
          }}
        >
          <Panel id="abandoned" key="abandoned" header="Abandoned Dog Policy">
            <BlockQuote large>
              <InfoCircleOutlined />
              <p>It is unfortunate that this policy is necessary.</p>
            </BlockQuote>
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
          <Panel
            header="After Hours Service Policy"
            key="after-hours"
            id="after-hours"
          >
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
              so please don't ask us to make exceptions to this policy.
            </p>
          </Panel>
          <Panel
            header="Agressive Dog Policy"
            key="aggressive-dog"
            id="aggressive-dog"
          >
            <p>
              An aggressive dog is defined as a dog that has bitten or injured a
              human or another dog, and/or growls, bares teeth, lunges or snaps
              at a person or dog. An aggressive dog will be allowed to be
              boarded in our kennel, however, the owner of said dog must inform
              us of the potential for injury prior to making reservations. Under
              no circumstances will an aggressive dog be provided with{" "}
              <Link href={"/boarding?tab=special-services"}>
                <a>special services</a>
              </Link>{" "}
              other than bedding rental.
            </p>
            <p>
              The owner of an aggressive will be held liable for any injury
              sustained to himself, another dog, an employee, representative, or
              clients of Gillette Kennels, and for any damage to our facility
              caused by said dog. Should an aggressive dog injure itself and be
              unapproachable by our staff, we will contact Kalamazoo Animal
              Control and have the dog removed from the premises so that it may
              be properly cared for.
            </p>
          </Panel>
          <Panel header="Bedding" key="bedding" id="bedding">
            <p>
              We feel that it is an absolute must that dog(s) in our care be
              provided with clean comfortable bedding. However, this is a much
              more difficult and time consuming task than you'd suspect,
              especially when caring for multiple dogs. For example, it is not
              uncommon for a dog to soil its bedding. When this happens we must
              temporarily remove the bedding and launder it. Also, dogs
              frequently damage their beds, which necessitates mending. Worse
              yet, some dogs completely destroy their bedding. This is sometimes
              followed by the owner's bewilderment and compliant, “my dog never
              destroyed his bedding at home.” In addition, clients sometimes
              bring bedding that is inappropriate for the kennel environment.
              Sometimes client provided bedding is too heavy and bulky to easily
              be moved while the dog's run is being disinfected. Some client
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
            <BlockQuote large>
              <div>
                <p>All client provided bedding must:</p>
                <p>
                  <ul>
                    <li>Be clean, safe, easily laundered or cleaned.</li>
                    <li>Lightweight and managable.</li>
                    <li>Labled with the dogs name.</li>
                    <li>Made of a snag free material.</li>
                  </ul>
                </p>
                <p>
                  The bedding must fit into the dogs run while allowing him room
                  to eat, drink and move around. large oversized heavy bedding
                  will not be accepted. knited or crochayed beds and carpeting
                  will also not be accepted.
                </p>
                <p>
                  Clients who choose to provide their own bedding will be
                  charged a laundry service fee of $1.50 per incident should
                  their dogs soil their bedding.{" "}
                </p>
              </div>
            </BlockQuote>
            <p>
              The laundry service is required for owner provided bedding. We
              will not allow soiled bedding to remain in the kennel. When dogs
              soil client provided bedding we will launder it. We also do not
              feel comfortable returning soiled bedding to clients. However,
              when a dog soils bedding immediately before departure and we are
              forced to return it soiled, we will place it in a plastic bag.
              Clients who receive soiled bedding at departure will be charged
              the laundry service fee for each incident that the bedding was
              laundered during the dogs stay. When clients check out early
              without notification there is a possibility that the dogs bed will
              be in the laundry or returned soiled. It may seem like it is a
              small matter, but when caring for multiple dogs, laundering
              bedding can become very time-consuming. We feel that it is only
              fair that we receive compensation for the additional work required
              to launder client bedding.
            </p>
            <p>
              Clients that do not own bedding appropriate for the kennel
              environment or forget to bring their dog's bed can rent quality
              bedding from us at a nominal fee.
            </p>
          </Panel>
          <Panel
            header="Destructive Dog Policy"
            key="destructive-dog"
            id="destructive-dog"
          >
            <p>
              Clients who board dogs with us that are destructive will be held
              liable for all damage caused to our kennel and any injury that the
              dog may inflict upon itself while engaging in destructive
              behaviors. This policy is applied to any and all destructive dogs
              regardless of the reason for destruction. That is, whether the dog
              has Separation Anxiety, Fear of Thunderstorms, or any phobia or
              generalized escape behavior.
            </p>
            <p>
              In addition, when clients provide us with a veterinarian
              prescribed sedative for their dogs to help to prevent escape
              behaviors, we will not be held responsible or liable should the
              sedative not be given in time to prevent destruction or injury!
            </p>
            <BlockQuote large>
              <p>
                Although we will allow dogs with these problems to be boarded at
                our kennel, clients must agree to this policy and board at their
                own risk!
              </p>
            </BlockQuote>
          </Panel>
          <Panel header="Dirty Dog Policy" key="dirty-dog" id="dirty-dog">
            <p>
              A dirty dog is a dog that runs through his feces immediately after
              he defecates, or defecates and urinates in the inside run or on
              his bedding. When we are aware that a dog is a “dirty dog” we will
              do our best to keep him clean by limiting his freedom to the
              outside run. However, should a dirty dog begin to stink up the
              kennel we will bathe the dog at the owner's expense. Also, should
              a dirty dog soil client provided bedding we will launder it at the
              owner's expense.
            </p>
            <p>
              We make every effort to keep our kennel clean and odor free,
              therefore, should a client drop off a dog that is overdue for a
              bath, and should said dog cause an unpleasant odor in our kennel,
              we will bathe the dog at the owner's expense.
            </p>
          </Panel>
          <Panel header="Feeding" key="feeding" id="feeding">
            <p>
              Our guests are routinely fed at 9:00 AM. Additional evening
              feedings ($.75 per meal) are available upon request. The evening
              feeding is provided at 4:00 PM. Food and water are served in our
              dishes, so please do not bring dishes.
            </p>
            <p>
              We serve quality Iam's and Iam's Eukanuba products. You have a
              choice of Adult Eukanuba Lamb and Rice, Puppy food, or Large Breed
              Puppy food. Clients who feed a different brand are encouraged to
              provide us with food, as a sudden change in diet can result in
              diarrhea. Please see our{" "}
              <Link href="/boarding?tab=medical-issues">
                <a>medical issues</a>
              </Link>{" "}
              page for more information.
            </p>
            <p>
              If you provide food please package EACH MEAL in a *Ziploc® (type)
              plastic bag (no fold-over sandwich baggies, please) with each meal
              clearly labeled with your pet's name. See example below.
            </p>
            <Image
              alt="Ziplock back of dog food"
              src={
                "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666440932/gk-app/food_picture.jpg"
              }
              width={500}
              height={300}
            />
            <p>
              Please do not label days/dates or AM/PM unless the meals are
              different. Please DO NOT put medications in the food bags, and
              please do not bag canned food. If you board for an extended period
              (14 days or more) you can provide food in a clean, airtight
              container labeled with your pet's name. An unopened bag of dog
              food does not constitute a sealed container.
            </p>
          </Panel>
          <Panel
            header="Fence Fighters"
            key="fence-fighting"
            id="fence-fighting"
          >
            <p>
              A fence fighter is a dog that lunges, jumps, and barks at the dogs
              housed in the adjacent kennels. Fence fighters also grab the
              fencing with their teeth and stick their noses through the chain
              links. Sometimes this behavior is playful and sometimes it is
              aggressive. When we encounter fence fighters we do the best that
              we can to control this behavior. For example, we may limit the
              dog's freedom or move the dog to another kennel. It is generally
              not possible to completely eliminate the behavior; therefore,
              should a fence fighter break a tooth, scratch its nose, or in any
              way injure itself, Gillette Kennels will not be held liable.
              Furthermore, clients who board dogs with us that are fence
              fighters will be held liable for all damage caused to our kennel
              and any injury that the dog may inflict upon itself while engaging
              in this behavior.
            </p>
          </Panel>
          <Panel
            header="Fence Jumpers And Climbers"
            key="fence-jumping"
            id="fence-jumping"
          >
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
          <Panel
            header="General Cancellation Policy"
            key="cancellation-policy"
            id="cancellation-policy"
          >
            <BlockQuote large>
              <p>All reservations must be secured by a valid credit card</p>
            </BlockQuote>
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
          <Panel header="Leashes And Tags" key="leashes-tags" id="leashes-tags">
            <BlockQuote large>
              <p>
                All dogs on the premises must be leashed at all times. <br />
                NO EXCEPTIONS. It's the law and our policy
              </p>
            </BlockQuote>
            <p>
              It is also important that the leash be attached to a properly
              fitted collar. A flat collar must fit snug around the dog's neck.
              You should be able to place only two fingers between your dog's
              neck and collar. The collar must not be so loose that it pulls
              over your dog's head. It is also important that the collar contain
              your dog's tags.
            </p>
            <p>
              Michigan State Law requires that your dog be licensed and that his
              current tags be securely attached to the collar, which …“shall at
              all times be kept on the dog for which the license is issued,
              except when such dog is engaged in lawful hunting accompanied by
              its owner or custodian.”
            </p>
            <p>
              Under no circumstances shall your dog's tags be attached to a
              training collar (i.e., a choke chain or a pinch collar) while
              being boarded. For safety reasons, training collars are routinely
              removed from all dogs when they are placed into the kennel run. It
              is your responsibility to present your dog to us with his/her tags
              securely attached to a properly fitted flat collar.
            </p>
          </Panel>
          <Panel header="Pet Detect" key="pet-detect" id="pet-detect">
            <p>
              Printed identification collar bands for pets and their personal
              possessions. Allows for immediate and positive identification of
              any pet and their belongings anywhere, anytime by any staff
              member. Printed information includes pet's name, run number, meds
              information, your kennel name, and other critical data.
            </p>
          </Panel>

          <Panel
            header="Lost Or Damaged Items"
            key="lost-items"
            id="lost-items"
          >
            <p>
              While we do allow you to bring toys and bedding for your dog, we
              suggest that you bring not more than three toys that are clearly
              labeled with your dog's name. Cloth toys that your dog tears up or
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
          <Panel
            header="Premium Date and Holiday Cancellation Policy"
            key="premium-cancellation"
            id="premium-cancellation"
          >
            <BlockQuote large>
              <p>
                All reservations must be secured by a valid credit card. NO
                EXCEPTIONS.
              </p>
            </BlockQuote>
            <p>
              All reservations made for any holiday, holiday weekend, or premium
              date require a per run $25.00 non-refundable deposit Clients that
              cancel holiday reservations without at least 5 days notice will
              automatically forfeit the deposit Clients that cancel holiday
              reservations or premium date reservatiions with less than 24 hours
              notice will be charged for the entire booked reservation.
            </p>
          </Panel>
          <Panel
            header="Premium Date and Holiday Early Pick-ups or Reservation Changes"
            key="premium-early-pickup"
            id="premium-early-pickup"
          >
            <p>
              Clients who reserve space for holidays that fail to provide us
              with at least 48 hours notice for early pick-ups will be charged
              for the entire scheduled reservation. In addition, clients who
              make changes to reservations without providing us with at least 48
              hours notice will be charged our regular daily rate for any days
              that the space reserved remains vacant. We are sorry that it has
              become necessary to implement such a strict cancellation policy;
              however, we cannot continue to incur the tremendous loss of
              revenue do to untimely cancellations, early pick-ups, and
              reservation schedule changes.
            </p>
          </Panel>
          <Panel
            header="Reservation Cancellation Policy"
            key="reservation-cancellation"
            id="reservation-cancellation"
          >
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
          <Panel header="Sick And Injured Dogs" key="sick-dog" id="sick-dog">
            <p>
              Should any dog become ill or injured while being boarded with us,
              we will, at our sole discretion, engage the services of client's
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
              and care having been exercised.
            </p>
            <p>
              Owner/agent agrees to pay all costs for any property damage or
              personal injury caused by his/her dog during its stay. All charges
              are due the day the dog is picked up. It is expressly agreed by
              owner and kennel that kennel's liability shall in no event exceed
              the lesser of current chattel value of a dog of the same breed and
              quality, or the sum of $200.00 per dog boarded. The owner further
              agrees to be solely responsible for any and all acts or behavior
              of said dog while it is in the care of the kennel.
            </p>
          </Panel>
        </Collapse>
      </Content>
    </Layout>
  );
};

export default Policies;
