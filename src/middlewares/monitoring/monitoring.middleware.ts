/**
 * Monitoring Middleware
 *
 */
import logger from '@utils/logger';

const sendMonitoringLogs = async (request) => {
  try {
    const { event, context, response } = request;
    const { body } = response;
    const logData = {
      request: event,
      context,
      response: JSON.parse(body),
      statusCode: response.statusCode
    };
    logger.info('API Request', logData);
  } catch (error) {
    logger.error('Monitoring error', error);
  }
};

const monitoringMiddleware = () => ({
  after: (handler, next) => {
    sendMonitoringLogs(handler);
    next();
  },
  onError: (handler, next) => {
    sendMonitoringLogs(handler);
    next();
  }
});

export default monitoringMiddleware;