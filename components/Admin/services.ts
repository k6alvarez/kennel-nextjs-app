import { message } from "antd";

export interface settingsFormProps {
    state: any;
    setFormError: any;
    dispatch: any;
    formSuccessCallback?: any;
    apiRoute: string;
    initialFormState: any;
    validationError?: string;
    successMessage?: string;
}

export const handleSettingsFormSubmit = async (
    e: React.SyntheticEvent,
    {
        state,
        setFormError,
        dispatch,
        formSuccessCallback,
        apiRoute,
        validationError = "Please fill out all required fields",
        successMessage = "Form submitted successfully",
        initialFormState,
    }: settingsFormProps
) => {
    e?.preventDefault();
    let data: { [x: string]: any }[] = Object.entries(state).map(([key, _value]) => {
        return {
            [key]: state[key].value !== undefined ? state[key].value : state[key],
        };
    });
    setFormError(undefined);
    try {
        await fetch(apiRoute, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.assign({}, ...data)),
        }).then((res) => {
            return res.json();
        }).then(async (res) => {
            if (res.errors) {
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
                type: "resetForm",
                payload: initialFormState,
            });
            message.success(successMessage);
            formSuccessCallback && formSuccessCallback(res);
        });
    } catch (error) {
        setFormError("We're sorry, something went wrong. Please try again.");
        console.error(error);
    }
};

export const getHolidayPremiumDates = async () => {
    const res = await fetch("/api/premium-holiday-dates");
    const pets = await res.json();
    return pets;
};

export const getBusinessHours = async () => {
    const res = await fetch("/api/business-hours");
    const hours = await res.json();
    return hours;
};