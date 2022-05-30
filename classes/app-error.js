class AppError {
  appError = true;
  message;
  data;
  statusCode;
  trace;
  constructor(message, statusCode, data) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = AppError;