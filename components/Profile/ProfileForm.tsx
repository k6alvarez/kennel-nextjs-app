import { message } from "antd";
import React from "react";
import { renderFormFields } from "../Forms/renderFormFields";
import { Fieldset, Fields, Error } from "../Forms/styles";
import { getProfileHeader, getUserName } from "./helpers";
import { profileFormSubmit } from "./services";

export const ProfileForm = ({
  user,
  profileFormState,
  setFormError,
  profileFormDispatch,
  formError,
  initialState,
}) => {
  return (
    <>
      <h1>{getProfileHeader(user?.permissions || [])}</h1>
      <p>{getUserName(user)}</p>
      <form
        onSubmit={async (e) => {
          await profileFormSubmit(e, {
            state: profileFormState,
            setFormError,
            dispatch: profileFormDispatch,
            userId: user.id,
          }).then(() => {
            message.success("Profile updated successfully");
          });
        }}
      >
        {formError && <Error>{formError}</Error>}
        <Fieldset>
          <Fields>
            {renderFormFields({
              initialState,
              state: profileFormState,
              handleChange: (name: string, newValue: any) => {
                const error = null;
                profileFormDispatch({
                  key: name,
                  payload: { newValue, error },
                });
              },
            })}
          </Fields>
          <input type="submit" value="Update Profile" />
        </Fieldset>
      </form>
    </>
  );
};
