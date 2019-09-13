import jwt from 'jsonwebtoken';
import config from 'config';

const verifyJwtToken = (req, res, next) => {
    const secretKey = config.jwt.secretKey;
    const algorithm = config.jwt.algorithm;
    const accessToken = req.headers['access-token'];

    jwt.verify(accessToken, secretKey, algorithm, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                message: err.message,
            });
        }

        if (!decoded || !decoded.user_id) {
            return res.status(401).json({
                message: 'Invalid refresh token',
            });
        }

        req.user = decoded;
        next();
    });
};

export default verifyJwtToken;
