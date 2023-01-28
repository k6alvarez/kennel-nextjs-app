import React from "react";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { Content } from "../ui-kit/Base";
import { Gallery } from "../ui-kit/Gallery";
import { Tiptap } from "../ui-kit/Tiptap";
import BoardingRates from "./BoardingRates";
import { RunSizes } from "./RunSizes";

const BoardingCats = ({
  editMode,
  content,
  setContent,
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
                setContent({ content: html });
                saveContent({
                  apiPath: `/api/content-item/${content.id}`,
                  html,
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
      <RunSizes filterType="cats-only" />
    </>
  );
};

BoardingCats.propTypes = {};

export default BoardingCats;
