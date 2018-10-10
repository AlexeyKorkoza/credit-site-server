import express from 'express';

import {
    updateProfileManager,
    changePassword,
} from '../../controllers/api/managers';

const route = express.Router();

route.put('/managers/update-profile', updateProfileManager);
route.put('/managers/change-password', changePassword);

export default route;
