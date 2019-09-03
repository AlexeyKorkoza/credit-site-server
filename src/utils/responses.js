const responses = {
    send500: res => {
        return res.status(500).json({
            code: 500,
            message: 'Internal Error'
        });
    },
};

export default responses;
