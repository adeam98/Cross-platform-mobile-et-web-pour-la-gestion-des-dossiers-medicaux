const express = require('express');
const router = express.Router();
const {getMaladies, addmaladie, updateMaladie, deleteMaladie} = require('../../controllers/medcin/maladie');

router.get('/all/:id_user', getMaladies);
router.post('/add/maladie/:id_user', addmaladie);
router.put('/maladie/update/:id_user', updateMaladie);
router.delete('/maladie/delete/:id_user', deleteMaladie);
    
module.exports = router;