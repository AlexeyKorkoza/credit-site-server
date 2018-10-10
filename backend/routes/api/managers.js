import express from 'express';

import {
    updateProfileManager,
} from '../../controllers/api/managers';

const route = express.Router();

route.put('/managers/update-profile', updateProfileManager);

export default route;
