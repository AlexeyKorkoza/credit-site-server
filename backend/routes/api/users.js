import express from 'express';

import { createUser } from '../../controllers/api/users';

const route = express.Router();

route.post('/users', createUser);

export default route;
