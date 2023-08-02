import { message } from "antd";
import Router from "next/router";

export const createReservationDraft = async (
    e: React.SyntheticEvent,
    { state, setFormError, dispatch, apiPath }
) => {
    e?.preventDefault();
    const cloneState = { ...state };
    delete cloneState["name"];
    delete cloneState["lastName"];
    delete cloneState["email"];
    delete cloneState["phone"];
    delete cloneState["address"];
    delete cloneState["unit"];
    delete cloneState["city"];
    delete cloneState["state"];
    delete cloneState["zip"];
    delete cloneState["altPhone"];
    delete cloneState["emergencyContactName"];
    delete cloneState["emergencyContactPhone"];
    delete cloneState["howHear"];
    const data = Object.entries(cloneState).map(([key, _value]) => {
        return {
            [key]: state[key].value !== undefined ? state[key].value : state[key],
        };
    });
    setFormError(undefined);
    try {
        await fetch(apiPath, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.assign({}, ...data)),
        })
            .then((res) => {
                return res.json();
            })
            .then(async (res) => {
                if (res.errors) {
                    const validationError =
                        "Please verify all required fields are filled out.";
                    Object.entries(res.errors).forEach(([key, value]) => {
                        dispatch({
                            key: key,
                            payload: {
                                newValue: state[key].value,
                                error: value,
                            },
                        });
                    });
                    setFormError(validationError);
                    throw new Error(validationError);
                }
                dispatch({
                    type: "formDraftCreated",
                    payload: {
                        reservationId: res.id,
                    },
                });
                message.success("Reservation request submitted successfully.");
                await Router.push("/reservation/[id]", `/reservation/${res.id}`);
            });
    } catch (error) {
        message.error("Something went wrong. Please try again.");
        console.error(error);
    }
};

export const getReservations = async () => {
    const res = await fetch("/api/reservations");
    return res.json();
}