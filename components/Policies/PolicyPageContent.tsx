import Link from "next/link";
import React from "react";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { Tiptap } from "../ui-kit/Tiptap";

export const PolicyPageContent = ({
  editMode,
  policiesContent,
  setPoliciesContent,
  setIsLoading,
  isLoading,
}) => {
  return (
    <>
      {editMode ? (
        <EditForm onSubmit={(e) => e.preventDefault()}>
          <Tiptap
            content={policiesContent?.content || { content: "" }}
            onSave={(html) => {
              setPoliciesContent({ content: html });
              saveContent({
                apiPath: `/api/content-item/${policiesContent.id}`,
                payload: { content: html },
                setLoading: setIsLoading,
              });
            }}
            isLoading={isLoading}
          />
        </EditForm>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: policiesContent?.content }} />
      )}
      {editMode && (
        <blockquote>
          Add more policies at&nbsp;
          <Link href={"/create-policy"}>
            <a>create policies</a>
          </Link>
          &nbsp;page.
        </blockquote>
      )}
    </>
  );
};
