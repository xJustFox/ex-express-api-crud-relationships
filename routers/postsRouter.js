const express = require('express');
const router = express.Router();

const { index, store, show, update, destroy } = require('../controllers/postsController.js');
const validator = require('../middlewares/validator.js');
const { paramSLUG } = require('../validations/generic.js');
const { bodyData } = require('../validations/posts.js');

router.get('/', index);
router.post('/', validator(bodyData), store);

router.use('/:slug', validator(paramSLUG));

router.get('/:slug', show);
router.put('/:slug', validator(bodyData), update);
router.delete('/:slug', destroy);

module.exports = router;