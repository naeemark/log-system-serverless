import httpStatus from 'http-status';
import Class from 'es-class';

/**
 * Wrap Error
 * @param {String} errorCode          Code
 * @param {String} errorTitle         Title
 * @param {String} errorDescription   Description
 */
const generateError = (errorCode, errorTitle, errorDescription) => {
  const result = { errorCode, errorTitle, errorDescription };
  return result;
};

/**
 * @extends Error
 */
const ExtendableError = Class({
  extends: Error,
  constructor: function ({ message, status, error }) {
    this.super(message);
    this.name = this.constructor.name;
    this.message = message || 'Oops! Something is wrong';
    this.status = status;
    this.error = error;
  }
});


/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  constructor({ message, status = httpStatus.INTERNAL_SERVER_ERROR, error }) {
    super({ message, error, status });
  }

  static unauthorizedRequest() {
    return new APIError({
      message: 'Request Unauthorized!',
      status: httpStatus.UNAUTHORIZED,
      error: generateError('UNAUTHORIZED', 'Oops! Something is wrong', 'Request is not authorized.')
    });
  }

  static unauthorized() {
    return new APIError({
      message: 'Request Unauthorized!',
      status: httpStatus.UNAUTHORIZED,
      error: generateError('UNAUTHORIZED', 'Oops! Something is wrong', 'You are not authorized for the action')
    });

  }
}

export { APIError, generateError };
