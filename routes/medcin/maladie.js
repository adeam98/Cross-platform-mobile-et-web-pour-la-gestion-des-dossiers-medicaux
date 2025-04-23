const express = require('express');
const router = express.Router();
const {getmaladie, getMaladieById, createMaladie, updateMaladie, deleteMaladie} = require('../controllers/medcin/maladie');

router.get('/', getmaladie);
router.get('/:id', getMaladieById);
router.post('/', createMaladie);
router.put('/:id', updateMaladie);
router.delete('/:id', deleteMaladie);