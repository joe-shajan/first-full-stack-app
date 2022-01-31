 const authHeader = () => {
    const user = localStorage.getItem("token");
    // in local storage user also need to be there
    if (user) {
        return { "x-auth-token": user };
    } else {
        console.log('no token');
        return {};
    }
}
export const adminAuthHeader = () => {
    const admin = localStorage.getItem("admintoken");
    // in local storage user also need to be there
    if (admin) {
        return { "x-auth-token": admin };
    } else {
        console.log('no token');
        return {};
    }
}

export default authHeader;