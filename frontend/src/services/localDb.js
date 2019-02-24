import { getItem, setItem, removeItem } from '../core/localStorage';

const userKey = 'user';

const getDataAuthUser = () => getItem(userKey, true);

const authUser = data => {
    setItem(userKey, data, true);
};

const logoutUser = () => {
    removeItem(userKey);
};

export {
    getDataAuthUser,
    authUser,
    logoutUser,
};
