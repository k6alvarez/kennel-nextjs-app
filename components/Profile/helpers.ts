export const getUserName = (user) => {
    const userEmail = user.email;
    const fullName = user.name && user.lastName && `${user.name} ${user.lastName}`;
    return `Signed in as ${fullName || userEmail}`;
}

export const getProfileHeader = (permissions) => `${permissions.includes("ADMIN")
? "Admin"
: permissions.includes("EMPLOYEE")
? "Employee"
: "Client"} Profile`