import express from 'express';

import auth from './auth';
import api from './api';

const route = express();

route.use('/auth', auth);
route.use('/api/v1', api);

export default route;
