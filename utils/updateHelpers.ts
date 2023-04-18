export const generalFormUpdate = async ({
    apiUrl,
    body,
    formSubmitCallback,
}) => {
    try {
        await fetch(`${apiUrl}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        formSubmitCallback && formSubmitCallback();
    } catch (error) {
        console.error(error);
    }
};