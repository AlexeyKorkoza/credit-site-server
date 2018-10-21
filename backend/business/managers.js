import { Manager } from '../models';

/**
 * @param adminId
 * @param managerId
 */
const makeBlockingOfManager = (adminId, managerId) => {
    const query = {
        where: {
            id: managerId,
        },
    };

    const data = {
        is_blocked: true,
        admin_id: adminId,
    };

    return Manager.update(data, query);
};

export {
    makeBlockingOfManager,
};
