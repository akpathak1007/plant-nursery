const { grasp } = require("../../utility/response-utility");
const joi = require("joi");
exports.add_plant = grasp(async (req, res, next) => {
  const { body } = req;
  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().max(1000),
    price: joi.number().required(),
    image: joi.string().max(300),
  });
  await schema.validateAsync(body);
  next();
});

exports.update_plant = grasp(async (req, res, next) => {
  const { body } = req;
  const schema = joi.object({
    id: joi.string().required(),
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    image: joi.string().required(),
  });
  await schema.validateAsync(body);
  next();
});

exports.delete_plant = grasp(async (req, res, next) => {
  const { query } = req;
  const schema = joi.object({
    _id: joi.string().required()
  })
  await schema.validateAsync(query);
  next()
})

exports.get_plants = grasp(async (req, res, next) => {
  const { query } = req;
  const schema = joi.object({
    _id: joi.string().empty('').optional()
  })
  await schema.validateAsync(query);
  next()
})
