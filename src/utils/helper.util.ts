import httpStatus from 'http-status';

const OK = (responseMessage = 'OK', response = {}, statusCode = httpStatus.OK) => ({
  statusCode,
  body: JSON.stringify({
    responseCode: statusCode,
    responseMessage,
    response
  }, null, 2)
});

export default OK;
