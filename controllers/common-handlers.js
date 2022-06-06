const Plant = require("../models/plant-model");

exports.fetch_plants = async (req) => {
  const {
    paginate: { limit, skip },
    query: { _id },
  } = req;
  if (_id && !(await Plant.findById(_id))) {
    error(`Plant does not exist with ID: ${_id}`);
  }
  plants = Plant.find(_id ? { _id } : {});
  if (!_id) {
    plants = await plants.skip(skip).limit(limit);
  } else {
    plants = await plants.exec();
  }
};
