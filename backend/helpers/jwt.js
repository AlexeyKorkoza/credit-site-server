import config from 'config';
import jwt from 'jsonwebtoken';

const buildToken = data => {
    const secretKey = config.jwt.secretKey;
    const algorithm = config.jwt.algorithm;
    return jwt.sign(data, secretKey, algorithm);
};

const buildExpiresIn = minutes => {
    const date = new Date();
    return date.setMinutes(date.getMinutes() + minutes);
};

export {
    buildToken,
    buildExpiresIn,
};
