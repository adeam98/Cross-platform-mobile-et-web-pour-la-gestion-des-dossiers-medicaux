const express = require('express');
const router = express.Router();
const { getmaladie } = require('../../controllers/patient/maladie');

router.get('/maladie/:id_user', getmaladie);

module.exports = router;