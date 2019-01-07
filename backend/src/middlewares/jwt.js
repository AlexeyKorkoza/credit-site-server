import jwt from 'jsonwebtoken';
import config from 'config';

const jwtMiddleware = (req, res, next) => {
    const secretKey = config.jwt.secretKey;
    const algorithm = config.jwt.algorithm;
    const { accessToken } = req.body;
    jwt.verify(accessToken, secretKey, algorithm, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                ok: 0,
                message: err.message,
            });
        }

        if (!decoded || !decoded.user_id) {
            return res.status(401).json({
                ok: 0,
                message: 'Invalid refresh token',
            });
        }

        req.user = decoded;
        next();
    });
};

export {
    jwtMiddleware,
};
