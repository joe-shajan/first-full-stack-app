import authAxios from "../Utils/axios-header";


//get user email from token from server
export const getUserEmailFromToken = async () => {

    let response = await authAxios.get('/users/get-user-details-from-token')
    if (response.status === 200) {
        return response.data.email

    } else {
        setTimeout(() => {
            authAxios.get('/users/get-user-details-from-token')
                .then(response => {

                    if (response.status === 200) {
                        return response.data.email
                    }
                })
        }, 2000);
    }

}

//user login

export const userLogin =async (data) => {
    const response = await authAxios.post('/users/login', {
        data,
    });

    if (response.data.user) {
        localStorage.setItem('token', response.data.user)
        return true
    } else {
        alert('user name or password incorrect')
    }
}

