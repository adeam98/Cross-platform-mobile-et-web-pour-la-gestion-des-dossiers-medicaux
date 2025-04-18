const express = require('express');
const router = express.Router();
const { getProfil } = require('../../controllers/patient/profil');

router.get('/:id', getProfil);  
module.exports = router;