const express = require('express');
const router = express.Router();
const { getAnalyseByEtat } = require('../../controllers/patient/analyse');

router.get('/analyse/:id_user/:etat', getAnalyseByEtat);

module.exports = router;
