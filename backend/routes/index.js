import express from 'express';

import auth from './auth';

const route = express();

route.use('/auth', auth);

export default route;
