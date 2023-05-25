import { Button, message } from "antd";
import React from "react";
import policy from "../../pages/api/policy";
import { TitleText, deletePolicy } from "../../pages/policies";
import { StyledInput } from "../Forms/styles";

export const PolicyPanelHeader = ({
  editMode,
  policiesState,
  setPoliciesState,
  policy,
  editedPolicyName,
  setEditedPolicyName,
}) => {
  return (
    <TitleText>
      {editMode ? (
        <>
          <StyledInput
            type="text"
            value={editedPolicyName.name || policy.name}
            onChange={(e) => {
              setEditedPolicyName({
                name: e.target.value,
                id: policy.id,
              });
            }}
          />
          <Button
            onClick={() => {
              deletePolicy(policy.id).then(() => {
                message.success("Policy deleted");
                setPoliciesState(
                  policiesState.filter((p) => p.id !== policy.id)
                );
              });
            }}
          >
            Delete
          </Button>
        </>
      ) : (
        <>{policy.name}</>
      )}
    </TitleText>
  );
};
