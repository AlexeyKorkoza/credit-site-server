const authMiddleware = {
    isLogIn: (req, res, next) => {
        const { role } = req.user;
        if (!role) {
            return res.status(401).json({
                ok: 0,
                err: 'You are not logged in',
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
            ok: 0,
            err: 'Access is forbidden',
        });
    },
    isAdmin: (req, res, next) => {
        const { role } = req.user;
        if (role === 'admin') {
            return next();
        }
        return res.status(403).json({
            ok: 0,
            err: 'Access is forbidden',
        });
    },
    isUser: (req, res, next) => {
        const { role } = req.user;
        if (role === 'user') {
            return next();
        }
        return res.status(403).json({
            ok: 0,
            err: 'Access is forbidden',
        });
    },
};

export default authMiddleware;
