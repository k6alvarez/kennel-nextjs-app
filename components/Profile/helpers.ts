export const getUserName = (user) => user?.name
? `${user.name} ${user.lastName ? user.lastName : null}`
: user?.email