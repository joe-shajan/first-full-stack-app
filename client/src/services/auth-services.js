import authAxios, { adminAuthAxios } from "../Utils/axios-header";
import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
})

//get user email from token from server
export const getUserEmailFromToken = async () => {

    let response = await authAxios.get('/users/get-user-details-from-token')
    if (response.status === 200) {
        return response.data.email
    }
}

//user login

export const userLogin = async (data) => {
    const response = await authAxios.post('/users/login', {
        data,
    });

    if (response.data.user) {
        localStorage.setItem('token', response.data.user.token)
        return (response.data.user.email);
    } else {
        alert('user name or password incorrect')
    }
}

//admin login
export const adminLogin = async (data) => {
    const response = await adminAuthAxios.post('/admin/login', {
        data,
    });

    if (response.data.admin) {
        localStorage.setItem('adminToken', response.data.admin.admintoken);
        return (response.data.admin.email);
    } else {
        alert('user name or password incorrect')
    }
}


//delete user
export const deleteItem = async (id) => {
    const response = await authAxios.delete('/users/delete-user/' + id)
    if (response.status === 200) {

        Toast.fire({
            icon: 'success',
            title: 'User Deleted'
        })
        return true
    }
}

//edit user

export const editUserDetails = async (id, data) => {
    const { status } = await authAxios.put(`/users/edit-user/${id}`, { data });
    if (status === 200) {
        Toast.fire({ icon: 'success', title: 'User Updated successfully' })
        return true
    }
    if (status === 201) {
        Toast.fire({ icon: 'error', title: 'This email already exists!' })
    }

}

//user signup


export const userSignup = async (data) => {
    const response = await authAxios.post(`/users/signup`, { data });
    if (response.status === 200) {
        Toast.fire({ icon: 'success', title: 'User Added successfully' })
        return true
    }
    if (response.status === 201) {
        Toast.fire({ icon: 'error', title: 'This email already exists' })
    }
}

