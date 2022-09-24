import { DeleteTwoTone } from "@ant-design/icons";
import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { renderFormFields } from "../../Forms/renderFormFields";
import { Fields } from "../../Forms/styles";
import { Button } from "../../ui-kit/Base";
import { useGuestFormContext } from "./formContext";
import {
  PET_FIVE_INITIAL_STATE,
  PET_FOUR_INITIAL_STATE,
  PET_ONE_INITIAL_STATE,
  PET_THREE_INITIAL_STATE,
  PET_TWO_INITIAL_STATE,
} from "./formInitialStatePets";

export const FieldsetPetsInfo = ({ pets, setPets }) => {
  const { guestFormState, handleChange, guestFormDispatch } =
    useGuestFormContext();

  return (
    <fieldset>
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="Pet 1" key="1">
          <Fields>
            {renderFormFields({
              initialState: PET_ONE_INITIAL_STATE,
              state: guestFormState,
              handleChange,
            })}
          </Fields>
        </Collapse.Panel>
        {pets >= 2 && (
          <Collapse.Panel
            header="Pet 2"
            key="2"
            extra={
              <>
                {pets === 2 && (
                  <DeleteTwoTone
                    onClick={(event) => {
                      // If you don't want click extra trigger collapse, you can prevent this:
                      event.stopPropagation();
                      guestFormDispatch({
                        type: "clearPet",
                        payload: {
                          petNumber: 2,
                        },
                      });
                      setPets(pets - 1);
                    }}
                  />
                )}
              </>
            }
          >
            <Fields>
              {renderFormFields({
                initialState: PET_TWO_INITIAL_STATE,
                state: guestFormState,
                handleChange,
              })}
            </Fields>
          </Collapse.Panel>
        )}
        {pets >= 3 && (
          <Collapse.Panel
            header="Pet 3"
            key="3"
            extra={
              <>
                {pets === 3 && (
                  <DeleteTwoTone
                    onClick={(event) => {
                      // If you don't want click extra trigger collapse, you can prevent this:
                      event.stopPropagation();
                      guestFormDispatch({
                        type: "clearPet",
                        payload: {
                          petNumber: 3,
                        },
                      });
                      setPets(pets - 1);
                    }}
                  />
                )}
              </>
            }
          >
            <Fields>
              {renderFormFields({
                initialState: PET_THREE_INITIAL_STATE,
                state: guestFormState,
                handleChange,
              })}
            </Fields>
          </Collapse.Panel>
        )}
        {pets >= 4 && (
          <Collapse.Panel
            header="Pet 4"
            key="4"
            extra={
              <>
                {pets === 4 && (
                  <DeleteTwoTone
                    onClick={(event) => {
                      // If you don't want click extra trigger collapse, you can prevent this:
                      event.stopPropagation();
                      guestFormDispatch({
                        type: "clearPet",
                        payload: {
                          petNumber: 4,
                        },
                      });
                      setPets(pets - 1);
                    }}
                  />
                )}
              </>
            }
          >
            <Fields>
              {renderFormFields({
                initialState: PET_FOUR_INITIAL_STATE,
                state: guestFormState,
                handleChange,
              })}
            </Fields>
          </Collapse.Panel>
        )}
        {pets >= 5 && (
          <Collapse.Panel
            header="Pet 5"
            key="5"
            extra={
              <>
                {pets === 5 && (
                  <DeleteTwoTone
                    onClick={(event) => {
                      // If you don't want click extra trigger collapse, you can prevent this:
                      event.stopPropagation();
                      guestFormDispatch({
                        type: "clearPet",
                        payload: {
                          petNumber: 5,
                        },
                      });
                      setPets(pets - 1);
                    }}
                  />
                )}
              </>
            }
          >
            <Fields>
              {renderFormFields({
                initialState: PET_FIVE_INITIAL_STATE,
                state: guestFormState,
                handleChange,
              })}
            </Fields>
          </Collapse.Panel>
        )}
      </Collapse>
    </fieldset>
  );
};
