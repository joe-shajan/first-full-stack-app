import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAppBar from '../Components/AdminNavbar/AdminNavbar';
import ViewUser from '../Components/ViewUser/VIewUser';

function AdminHome() {
    const navigate = useNavigate()
    useEffect(() => {
        const admin = localStorage.getItem('adminToken')
        if (!admin) {
            navigate('/admin/login')
        }
    }, []);

    return <>
        <AdminAppBar />
        <ViewUser />
    </>;
}

export default AdminHome;
