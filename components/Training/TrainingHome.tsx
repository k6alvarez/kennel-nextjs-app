import React from "react";
import { Content } from "../ui-kit/Base";

import { Promos } from "../ui-kit/Promo/Promos";
import { defaultDelay } from "../ui-kit/Promo";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { Tiptap } from "../ui-kit/Tiptap";

export const TrainingHome = ({
  editMode,
  content,
  setIsLoading,
  isLoading,
  editorStickyTop,
}) => {
  return (
    <>
      <Content editorStickyTop={editorStickyTop}>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={content?.content || { content: "" }}
              onSave={(html) => {
                saveContent({
                  html,
                  apiPath: `/api/content-item/${content.id}`,
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content?.content }} />
        )}

        <Promos
          delay={defaultDelay * 6}
          promos={[
            {
              title: "Group Lessons",
              description:
                "Ideal for individuals who want to save money and socialize their pets.",
              link: "/training?tab=group-lessons",
              image:
                "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419327/gk-app/Georgia_getting_some_fresh_air_edit.jpg",
            },
            {
              title: "Private Lessons",
              description:
                "One on one instruction at our training center. Our Best Service.",
              link: "/training?tab=private-lessons",
              image:
                "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585015261/gk-app/gktrain.jpg",
            },
          ]}
        />
        <Promos
          delay={defaultDelay * 6}
          promos={[
            {
              title: "Agility",
              link: "/training?tab=agility",
              description:
                "Fun for owners and dogs, agility training is a great way to bond.",
              image:
                "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585015261/gk-app/gktrainer.jpg",
            },
            {
              title: "Consultations",
              link: "/training?tab=consultations",
              description:
                "Having special problems with your dog? We can help!",
              image:
                "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419324/gk-app/Dobermann.png",
            },
          ]}
        />

        {/* <ClassList
          dateCheck={(x) => {
            return DateTime.local() < DateTime.fromISO(x.startDate);
          }}
        /> */}
      </Content>
    </>
  );
};
