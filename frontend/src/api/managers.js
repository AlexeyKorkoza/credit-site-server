import sender from "./sender";

const getManagers = () => {
    return sender(`${API_URL}/api/v1/managers`, 'get')
        .catch(err => console.error(err.message, 'getManagers'));
};

export {
    getManagers,
};
