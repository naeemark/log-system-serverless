import OK from '@utils/helper.util';
import logger from '@utils/logger';
import hello from '@services/hello.service';

const handler = async (event) => {
  logger.info(`I'm inside hello handler`);

  const response = await hello();
  return OK('Hello API', { response, event });
}

export default handler;