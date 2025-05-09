const express = require('express');
const { AddAnalyse} = require('../../controllers/centre_analyse/analyse');

const router = express.Router();

router.post('/add/analyse/:id_user', AddAnalyse);

module.exports = router;
