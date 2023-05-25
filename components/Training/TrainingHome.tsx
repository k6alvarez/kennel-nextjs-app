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
  setContent,
  setIsLoading,
  isLoading,
  editorStickyTop,
  classesPrimary,
  setClassesPrimary,
  classesSecondary,
  setClassesSecondary,
}) => {
  return (
    <>
      <Content editorStickyTop={editorStickyTop}>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={content?.content || { content: "" }}
              onSave={(html) => {
                setContent({ content: html });
                saveContent({
                  payload: { content: html },
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
      </Content>
      <Promos
        delay={defaultDelay * 6}
        promos={classesPrimary}
        setPromos={setClassesPrimary}
        editMode={editMode}
      />
      <Promos
        delay={defaultDelay * 6}
        promos={classesSecondary}
        setPromos={setClassesSecondary}
        editMode={editMode}
      />
    </>
  );
};
