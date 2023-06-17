export const generalFormUpdate = async ({
    apiUrl,
    body,
    formSubmitCallback,
}) => {
    try {
        const res = await fetch(`${apiUrl}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Something went wrong");
        }
        formSubmitCallback && formSubmitCallback(data);
    } catch (error) {
        console.error(error);
    }
};