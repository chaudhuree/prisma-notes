// create expres router
const express = require('express');
const router = express.Router();

// import controller
const { createUser } = require('../controllers/user');

router.post('/usercreate', createUser);

module.exports = router;