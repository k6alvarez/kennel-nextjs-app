import { InfoCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useState } from "react";
import { renderFormFields } from "../Forms/renderFormFields";
import { Fieldset, Fields, Error } from "../Forms/styles";
import { BlockQuote } from "../Reservations/GuestClients/FormIntro";
import { StepsAction } from "../Reservations/styles";
import { Button, SplitHeader } from "../ui-kit/Base";
import {
  getProfileHeader,
  getUserName,
  profileFormFieldsValid,
} from "./helpers";
import { profileFormSubmit, requiredFieldsCheck } from "./services";
import Router from "next/router";

export const ProfileForm = ({
  user,
  profileFormState,
  setFormError,
  profileFormDispatch,
  formError,
  initialState,
  router,
}) => {
  const [formLoading, setFormLoading] = useState(false);
  return (
    <>
      <SplitHeader>
        <h1>{getProfileHeader(user?.permissions || [])}</h1>
        <Button
          primary
          onClick={() => Router.push("/create-reservation")}
          small
        >
          Book Reservation
        </Button>
      </SplitHeader>

      <p>{getUserName(user)}</p>
      {requiredFieldsCheck({ profileFormState }) && (
        <BlockQuote>
          <InfoCircleOutlined />
          <p>
            Let's get started by verifying your contact information. This will
            be used to contact you about your reservations.
          </p>
        </BlockQuote>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setFormLoading(true);
          const fieldsValid = profileFormFieldsValid(
            {
              currentFormSection: 0,
            },
            {
              state: profileFormState,
              dispatch: profileFormDispatch,
            }
          );

          if (fieldsValid) {
            await profileFormSubmit(e, {
              state: profileFormState,
              setFormError,
              dispatch: profileFormDispatch,
              userId: user.id,
            })
              .then(() => {
                message.success("Profile updated successfully");
                setFormLoading(false);
              })
              .catch(() => {
                setFormLoading(false);
                setFormError("Profile update failed. Please try again.");
              });
          } else {
            setFormLoading(false);
          }
        }}
      >
        {formError && <Error>{formError}</Error>}
        <Fieldset disabled={formLoading}>
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
          <StepsAction>
            <input type="submit" value="Update Profile" />
            <Button
              type="button"
              onClick={() => {
                router.push(`/profile?tab=pets`, undefined, { shallow: false });
              }}
            >
              Manage Pets
            </Button>
          </StepsAction>
        </Fieldset>
      </form>
    </>
  );
};
