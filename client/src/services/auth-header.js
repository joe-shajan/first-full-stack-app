const authHeader = () => {
    const user = localStorage.getItem("token");
    // in local storage user also need to be there
    if (user) {
        return { "x-auth-token": user };
    } else {
        console.log('no teken');
        return {};
    }
}

export default authHeader;