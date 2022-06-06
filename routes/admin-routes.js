const express = require("express");

const plantController = require("../controllers/admin/plant-controller");
const plantValidators = require("../validators/admin/plant-validators");
const paginate = require('../middlewares/paginate-middleware');

const router = express.Router();

router
  .route("/plant")
  .post(plantValidators.add_plant, plantController.add_plant)
  .put(plantValidators.update_plant, plantController.edit_plant)
  .delete(plantValidators.delete_plant, plantController.delete_plant);
router.get("/plants",  paginate, plantValidators.get_plants, plantController.get_plants);

module.exports = router;
