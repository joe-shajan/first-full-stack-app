const jwt = require('jsonwebtoken');
const AdminModel = require('../models/admin-model');
require("dotenv").config();



const login = async (req, res) => {
    console.log(req.body.data);
    
    const admin = await AdminModel.findOne({ email: req.body.data.email, password: req.body.data.password })
    console.log(admin);
    if (admin) {
        const admintoken = jwt.sign({
            email: admin.email
        }, process.env.ACCESS_TOKEN_SECRET)

        return res.json({ status: 'ok', admin: {email:admin.email,admintoken} })
    } else {
        return res.json({ status: "error", error: 'user-does-not-exists' })
    }
}

module.exports={
    login
}