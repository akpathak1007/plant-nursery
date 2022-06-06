const joi = require("joi");
const { grasp } = require("../utility/response-utility");

module.exports = grasp(async (req, res, next) => {
  let {
    query: { pageNumber, pageSize },
  } = req;
  const schema = joi.object({
    pageNumber: joi.number().empty("").optional(),
    pageSize: joi.number().empty("").optional(),
  });
  await schema.validateAsync({ pageNumber, pageSize });
  pageSize = pageSize < 5 ? 5 : pageSize;
  pageNumber = pageNumber < 1 ? 1 : pageNumber;
  delete req.query.pageSize;
  delete req.query.pageNumber;
  
  req.paginate = {
    limit: +pageSize,
    skip: +(pageNumber * pageSize) - pageSize
  };
  next();
});
