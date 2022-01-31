const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/admin-controllers');


router.post('/login',adminControllers.login)

module.exports = router;