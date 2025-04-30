const express = require('express');
const router = express.Router();
const {getmaladie, getMaladieById, createMaladie, updateMaladie, deleteMaladie} = require('../controllers/medcin/maladie');

router.get('/maladie', getmaladie);
router.get('/maladie/:id', getMaladieById);
router.post('/maladie', createMaladie);
router.put('/maladie/:id', updateMaladie);
router.delete('/maladie/:id', deleteMaladie);