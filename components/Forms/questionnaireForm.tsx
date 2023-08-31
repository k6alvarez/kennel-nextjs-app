import React, { useReducer, useState } from "react";
import { questionnaireFormReducer } from "./questionnaireFormReducer";
import { useSession } from "next-auth/react";
import Layout from "../Layout";
import { Error, Fields, Fieldset } from "./styles";
import { renderFormFields } from "./renderFormFields";
import {
  INITIAL_QUESTIONNAIRE_FORM_STATE,
  getQuestionnaireFormFields,
} from "./helpers";

export const questionnaireFormSubmit = async (
  e: React.SyntheticEvent,
  { state, setFormError, dispatch }
) => {
  e?.preventDefault();
  const data = Object.entries(state).map(([key, _value]) => {
    return {
      [key]: state[key].value !== undefined ? state[key].value : state[key],
    };
  });
  setFormError(undefined);
  try {
    await fetch("/api/questionnaire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.assign({}, ...data)),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (res) => {
        // if (res.errors) {
        //   const validationError =
        //     "Form submission failed. Please verify all required fields are filled out.";
        //   Object.entries(res.errors).forEach(([key, value]) => {
        //     dispatch({
        //       key: key,
        //       payload: {
        //         newValue: state[key].value,
        //         error: value,
        //       },
        //     });
        //   });
        //   setFormError(validationError);
        //   throw new Error(validationError);
        // }
        // dispatch({
        //   type: "resetForm",
        // });
        console.log("res", res);
        // await Router.push("/res-guest/[id]", `/res-guest/${res.id}`);
      });
  } catch (error) {
    console.error(error);
  }
};

export const QuestionnaireForm = ({ user }) => {
  const { data: session, status } = useSession();

  const [questionnaireFormState, questionnaireFormDispatch] = useReducer(
    questionnaireFormReducer,
    getQuestionnaireFormFields({ user })
  );

  const [formError, setFormError] = useState(undefined);

  if (status === "loading") {
    return <Layout>Loading ...</Layout>;
  }

  return (
    <form
      onSubmit={(e) => {
        questionnaireFormSubmit(e, {
          state: questionnaireFormState,
          setFormError,
          dispatch: questionnaireFormDispatch,
        });
      }}
    >
      {formError && <Error>{formError}</Error>}
      <Fieldset disabled={false}>
        <Fields>
          {renderFormFields({
            initialState: INITIAL_QUESTIONNAIRE_FORM_STATE,
            state: questionnaireFormState,
            handleChange: (name: string, newValue: any) => {
              const error = null;
              questionnaireFormDispatch({
                key: name,
                payload: { newValue, error },
              });
            },
          })}
        </Fields>
      </Fieldset>
      <input type="submit" value="Submit Questionnaire" />
    </form>
  );
};
