import express from 'express';

import users from './users';
import managers from './managers';
import clients from './clients';

const route = express.Router();

route.use('/', users);
route.use('/', managers);
route.use('/', clients);

export default route;
