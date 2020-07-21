const authMiddleware = {
    isLogIn: (req, res, next) => {
        const { role } = req.user;
        if (!role) {
            return res.status(403).json({
                message: 'You are not logged in',
            });
        }
        return next();
    },
    isManager: (req, res, next) => {
        const { role } = req.user;
        if (role === 'manager') {
            return next();
        }

        return res.status(403).json({
            message: 'Access is forbidden',
        });
    },
    isAdmin: (req, res, next) => {
        const { role } = req.user;
        if (role === 'admin') {
            return next();
        }
        return res.status(403).json({
            message: 'Access is forbidden',
        });
    },
    isUser: (req, res, next) => {
        const { role } = req.user;
        if (role === 'user') {
            return next();
        }
        return res.status(403).json({
            message: 'Access is forbidden',
        });
    },
    isManagerOrAdmin: (req, res, next) => {
        const { role } = req.user;
        if (role === 'admin' || role === 'manager') {
            return next();
        }

        return res.status(403).json({
            message: 'Access is forbidden',
        });
    },
};

export default authMiddleware;
