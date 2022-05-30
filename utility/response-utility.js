const { DEV, PROD } = require('../constants/app-constants');
const AppError = require('../classes/app-error');
const http = require('../constants/http-constants');

/** Get http status by http code.  */
exports.getHttpStatus = (httpCode) => {
  let status = null;
  switch (httpCode) {
    case http._200:
      status = http.SUCCESS;
      break;
    case http._201:
      status = http.CREATED;
      break;
    case http._400:
      status = http.BAD_REQUEST;
      break;
    case http._401:
      status = http.UNAUTHORIZED;
      break;
    case http._403:
      status = http.FORBIDDEN;
      break;
    case http._404:
      status = http.NOT_FOUND;
      break;
    case http._500:
      status = http.INTERNAL_ERROR;
      break;
  }
  return status;
};
/** Grasp function is used for catching error.
 * Wrapping an API handler in the grasp function and all the error will be caught by this method. */
exports.grasp = (cb) => {
  return (req, res, next) => {
    cb(req, res, next).catch((err) => {
      next(err);
    });
  };
};
/** Generate consistent json response.  */
exports.response = (
  res,
  message,
  statusCode,
  data = null
) => {
  const status = getHttpStatus(statusCode);
  const responseData = {
    status,
    statusCode,
    message,
    data,
  };
  return res.status(statusCode).json(responseData);
};
/** A global error handler. It should use in server.js file after defining all the routers. */
exports.errorResHandler = (err, req, res, next) => {
  console.log(err);
  const env = process.env.NODE_ENV;
  const { appError } = err;
  let message = err.message;
  let data = appError ? err.data : null;
  let status = 500;
  if (env === DEV) {
    if (appError) {
      status = err.statusCode;
    } else if (Object.getPrototypeOf(err).isJoi) {
      status = _400;
    }
    return response(res, message, status, data);
  } else if (env === PROD) {
    status = appError ? err.status : status;
    return response(res, message, status, data);
  }
};
/** Send success json response  */
exports.success = (
  res,
  message,
  data = null,
  statusCode = _200
) => {
  return response(res, message, statusCode, data);
};
/** Throw and error with will be catched by the grasp method and handle by the errorResHandler(). errorResHandler() method is a global error handler.  */
exports.error = (
  message,
  statusCode = _400,
  data = null
) => {
  throw new AppError(message, statusCode, data);
};