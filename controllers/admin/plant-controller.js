const { grasp, success, error } = require("../../utility/response-utility");
const Plant = require("../../models/plant-model");
const { _201, _404 } = require("../../constants/http-constants");

exports.add_plant = grasp(async (req, res) => {
  const { name, description, price, image } = req.body;
  const plant = await Plant.create({
    name,
    image,
    description,
    price,
  });
  if (plant) {
    return success(res, "Plant added successfully.", { _id: plant._id }, _201);
  } else {
    error("Unable to create plant.");
  }
});

exports.edit_plant = grasp(async (req, res) => {
  const { id, name, description, price, image } = req.body;
  const updatedAt = Date();
  if (!(await Plant.findById(id))) {
    error("This plant does not exist.", _404);
  }
  await Plant.findByIdAndUpdate(id, {
    name,
    description,
    price,
    image,
    updated_at: updatedAt,
  });
  return success(res, "Plant updated successfully.");
});

exports.delete_plant = grasp(async (req, res) => {
  const { _id } = req.query;
  if (!(await Plant.findById(_id))) {
    error("Plant does not exist.", _404);
  }
  await Plant.findByIdAndRemove(_id);
  return success(res, "Plant delete successfully.");
});

exports.get_plants = grasp(async (req, res) => {
  const {
    paginate: { limit, skip },
    query: { _id },
  } = req;
  if (_id && !(await Plant.findById(_id))) {
    error(`Plant does not exist with ID: ${_id}`);
  }
  plants = Plant.find(_id ? { _id } : {});
  if (!_id) {
    plants = await plants.skip(skip).limit(limit)
  } else {
    plants = await plants.exec()
  }
  const message =
    plants.length === 0 ? "No plants found" : "Plants found successfully.";
  return success(res, message, plants);
});
