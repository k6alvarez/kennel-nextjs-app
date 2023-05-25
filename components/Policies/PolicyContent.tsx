import React from "react";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { Tiptap } from "../ui-kit/Tiptap";

export const PolicyContent = ({
  editMode,
  policy,
  setPoliciesContent,
  setPoliciesState,
  policiesState,
  editedPolicyName,
  setIsLoading,
  isLoading,
}) => {
  return (
    <>
      {editMode ? (
        <>
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={policy?.content || { content: "" }}
              onSave={(html) => {
                setPoliciesContent(() => {
                  const policies = policiesState.map((p) => {
                    if (p.id === policy.id) {
                      return {
                        ...p,
                        content: html,
                        name: editedPolicyName.name || p.name,
                      };
                    }
                    return p;
                  });
                  setPoliciesState(policies);
                });
                saveContent({
                  apiPath: `/api/policy/${policy.id}`,
                  payload: { content: html, name: editedPolicyName.name },
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        </>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: policy.content }} />
      )}
    </>
  );
};
