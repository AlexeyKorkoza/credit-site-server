import express from 'express';

import users from './users';
import managers from './managers';
import clients from './clients';
import clientCards from './client_cards';
import loans from './loans';

const route = express.Router();

route.use('/', users);
route.use('/', managers);
route.use('/', clients);
route.use('/', clientCards);
route.use('/', loans);

export default route;
