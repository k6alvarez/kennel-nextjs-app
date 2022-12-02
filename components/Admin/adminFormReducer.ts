export const BUSINESS_HOURS_INITIAL_STATE = {
    name: {
        value: "",
        error: null,
        type: "text",
        label: "Hours Range Name",
        required: true,
        grow: true,
        cancelAutoFocus: true,
    },
    isClosed: {
        value: false,
        error: null,
        type: "checkbox",
        label: "Closed All Day",
        required: false,
        grow: true,
    },
    timeOpen: {
        value: "",
        error: null,
        label: "Open Time",
        type: "time",
        required: true,
    },
    timeClose: {
        value: "",
        error: null,
        label: "Close Time",
        type: "time",
        required: true,
    },
    breakClose: {
        value: "",
        error: null,
        label: "Lunch Close Time",
        type: "time",

    },
    breakOpen: {
        value: "",
        error: null,
        label: "Lunch Open Time",
        type: "time",

    },
}

export const HOLIDAY_AND_PREMIUM_DAYS_INITIAL_STATE = {
    type: {
        value: "Holiday",
        error: null,
        type: "select",
        label: "Date Type",
        required: true,
        options: ["Holiday", "Premium"],
    },
    name: {
        value: "",
        error: null,
        type: "text",
        label: "Date Range Name",
        required: true,
    },
    dateFrom: {
        value: "",
        error: null,
        type: "date",
        label: "Date From",
        required: true,
    },
    dateTo: {
        value: "",
        error: null,
        type: "date",
        label: "Date To",
    },
    isClosed: {
        value: false,
        error: null,
        type: "checkbox",
        label: "Closed All Day",
        required: false,
        grow: true,
    },
    timeOpen: {
        value: "",
        error: null,
        label: "Open Time",
        type: "time",
    },
    timeClose: {
        value: "",
        error: null,
        label: "Close Time",
        type: "time",
    },
    breakClose: {
        value: "",
        error: null,
        label: "Lunch Close Time",
        type: "time",
    },
    breakOpen: {
        value: "",
        error: null,
        label: "Lunch Open Time",
        type: "time",
    },
};

export const settingsFormReducer = (
    formState: { [x: string]: any },
    { type = "inputChange", key = undefined, payload = undefined }: any
) => {
    switch (type) {
        case "resetForm":
            return { ...payload };

        case "inputChange":

            let inputState = {
                ...formState[key],
                value: payload.newValue,
                error: payload.error,
            };


            if (key === "isClosed") {
                formState.timeOpen.disabled = payload.newValue;
                formState.timeClose.disabled = payload.newValue;
                formState.breakOpen.disabled = payload.newValue;
                formState.breakClose.disabled = payload.newValue;

                return {
                    ...formState,
                    [key]: inputState,
                };
            } else if (key === "type") {
                const checkForValue = payload.newValue === "Premium" ? true : false;
                formState.isClosed.disabled = checkForValue;
                formState.timeOpen.disabled = checkForValue;
                formState.timeClose.disabled = checkForValue;
                formState.breakOpen.disabled = checkForValue;
                formState.breakClose.disabled = checkForValue;

                return {
                    ...formState,
                    [key]: inputState,
                };
            } else {
                return {
                    ...formState,
                    [key]: inputState,

                };
            }
    }
};
