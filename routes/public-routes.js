const express = require('express');

const plantController = require('../controllers/admin/plant-controller');
const plantValidator = require('../validators/admin/plant-validators');
const paginate = require('../middlewares/paginate-middleware');


const router = express.Router();

router.get('/plants', paginate, plantValidator.get_plants, plantController.get_plants);

module.exports = router;