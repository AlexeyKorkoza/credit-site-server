import express from 'express';

import {
    updateAttributesManager,
    updateProfileManager,
    changePassword,
    blockManager,
} from '../../controllers/api/managers';

const route = express.Router();

route.put('/managers/:id', updateAttributesManager);
route.put('/managers/update-profile', updateProfileManager);
route.put('/managers/change-password', changePassword);
route.put('/managers/block', blockManager);

export default route;
