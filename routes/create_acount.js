
const express = require('express');
const router = express.Router();
const {createacount,modifierinformation,deleteAccount,login} = require('../controllers/auto/account');

router.post('/create', createacount);
router.put('/:id', modifierinformation); 
router.delete('/:id', deleteAccount);
router.post('/login', login);
module.exports = router;
