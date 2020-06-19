import middy from 'middy';
import {
  httpEventNormalizer,
  httpHeaderNormalizer,
  jsonBodyParser,
  urlEncodeBodyParser,
  cors,
  httpSecurityHeaders
} from 'middy/middlewares';

import converter from '@middlewares/error/error.middleware'
import monitoringMiddleware from '@middlewares/monitoring/monitoring.middleware';
import routeValidator from '@middlewares/route-validator/route-validation.middleware'


import handler from './hello.handler';
import validator from './hello.validator';

const handlerWrapper = middy(handler)
  .use(converter())
  .use(cors())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(jsonBodyParser())
  .use(urlEncodeBodyParser({ extended: false }))
  .use(httpSecurityHeaders())
  .use(monitoringMiddleware())
  .use(routeValidator({ schema: validator.joiSchema }));

export default handlerWrapper;