 const express = require('express');
 const router = express.Router();
    const { getHomePage } = require('../../controllers/patient/home');

router.get('/:id_user', getHomePage);
module.exports = router;