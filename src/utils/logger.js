import config from 'config';
import bunyan from 'bunyan';

export default bunyan.createLogger(config.logger);
