
const express = require('express');

const router = express.Router();

const {createAccount,modifyInformation,login} = require('../controllers/auto/account');

router.post('/create', createAccount);

router.put('/:id', modifyInformation);
 
router.post('/login', login);

module.exports = router;
