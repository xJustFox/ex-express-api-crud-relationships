const express = require('express');
const router = express.Router();

const { store, index, show, update, destroy } = require('../controllers/categoriesController.js');
const validator = require('../middlewares/validator.js');
const {paramSLUG} = require('../validations/generic.js'); 
const {bodyData} = require('../validations/categories.js'); 

router.get('/', index);
router.post('/', validator(bodyData), store);

router.use('/:id', validator(paramSLUG));

router.get('/:id', show);
router.put('/:id', validator(bodyData), update);
router.delete('/:id', destroy);

module.exports = router;