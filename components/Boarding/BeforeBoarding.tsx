import { InfoCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { Content } from "../ui-kit/Base";
import { Tiptap } from "../ui-kit/Tiptap";

export const BeforeBoarding = ({
  editMode,
  content,
  setContent,
  setIsLoading,
  isLoading,
  editorStickyTop,
}) => {
  return (
    <Content editorStickyTop={editorStickyTop}>
      {editMode ? (
        <EditForm onSubmit={(e) => e.preventDefault()}>
          <Tiptap
            content={content?.content || { content: "" }}
            onSave={(html) => {
              setContent({ content: html });
              saveContent({
                apiPath: `/api/content-item/${content.id}`,
                payload: { content: html },
                setLoading: setIsLoading,
              });
            }}
            isLoading={isLoading}
          />
        </EditForm>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content?.content }} />
      )}

      {/* <BlockQuote large>
        <InfoCircleOutlined />
        <p>
          It is extremely important to socialize your dog to a boarding kennel
          at a young age.
        </p>
      </BlockQuote>
      <p>
        We suggest that individuals who have older dogs that have not been
        socialized to a kennel begin with a very short stay (a day or two) to
        let them get used to the kennel environment. We also suggest that
        individuals who have geriatric dogs (10 years or older) that have never
        been boarded before consider using an in home pet sitting service.
      </p>

      <p>
        We encourage you to take a tour of our facility before you board with
        us. We prefer to provide tours on Sundays during our regular Business
        Hours; however, we will attempt to accommodate your schedule to make
        special arrangements if Sunday doesn't work for you.
      </p>
      <p>
        Feel free to bring your dog's favorite toys and/or treats. Please limit
        the number of toys to three items and label all toys clearly with your
        dog's first and your last name. In addition, we feel it is important
        that your dog have a clean, comfortable bed to sleep on; however, we
        have instituted strict bedding requirements. Bedding is also now
        available from us for a nominal daily rental fee. Please see our{" "}
        <Link href="/boarding?tab=special-services">
          <a>special services</a>
        </Link>{" "}
        for more information.
      </p>
      <p>
        Clients who feed a different food than Iam’s and Iam’s Eukanuba products
        are encouraged to provide us with food, as a sudden change in diet can
        result in diarrhea. Please see our{" "}
        <Link href="/boarding?tab=medical-issues">
          <a>medical issues</a>
        </Link>{" "}
        page for more information. Clients who provide us with food must present
        the food to us as described in our{" "}
        <Link href="http://localhost:3000/policies?tab=feeding">
          <a>food policy.</a>
        </Link>
      </p>
      <p>
        All dogs must be up-to-date on their vaccinations. We require copies of
        shot records that we can keep on file. Please review our{" "}
        <Link href="/boarding?tab=vaccinations">
          <a>vaccinations</a>
        </Link>{" "}
        page.
      </p>
      <BlockQuote large>
        <InfoCircleOutlined />
        <p>
          If you decide to use our kennel please be advised that all dogs must
          be leashed when on the premises. This is important because other
          clients will be coming and going with their dogs, and we are
          frequently providing obedience training lessons on the property.
        </p>
      </BlockQuote>
      <p>
        For safety purposes please remember to bring your dog on a leash. If you
        arrive at the kennel without a leash please leave your dog in your
        vehicle while you borrow a leash from us. Please read our{" "}
        <Link href="/boarding?tab=checking-in">
          <a>procedures for checking in</a>
        </Link>{" "}
        prior to your arrival.
      </p> */}
    </Content>
  );
};
