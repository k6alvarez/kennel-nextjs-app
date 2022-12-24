import React from "react";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { Content } from "../ui-kit/Base";
import { Gallery } from "../ui-kit/Gallery";
import { Tiptap } from "../ui-kit/Tiptap";
import BoardingRates from "./BoardingRates";

const BoardingCats = ({
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
      <BoardingRates catsOnly />
      <Gallery
        images={[
          {
            src: "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585011486/gk-app/Screen_Shot_2020-03-23_at_8.57.07_PM.png",
          },
          {
            src: "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419329/gk-app/Gregor_chilling.jpg",
          },
          {
            src: "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419330/gk-app/Gregor_playing.jpg",
          },
          {
            src: "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419334/gk-app/Boo_in_CatTree.jpg",
          },
          {
            src: "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419338/gk-app/cattery_fluffy_cat.jpg",
          },
        ]}
      />
    </Content>
  );
};

BoardingCats.propTypes = {};

export default BoardingCats;
