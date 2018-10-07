import express from 'express'

import users from './users';

const route = express.Router();

route.use('/', users);

export default route;
