import config from 'config';
import jwt from 'jsonwebtoken';

const buildToken = (data, refreshToken = true) => {
    const { secretKey, algorithm, expiresIn } = config.jwt;

    const options = {
        algorithm,
    };

    if (refreshToken) {
        options.expiresIn = expiresIn;
    }

    return jwt.sign(data, secretKey, options);
};

const buildExpiresIn = minutes => {
    const date = new Date();
    return date.setMinutes(date.getMinutes() + minutes);
};

export {
    buildToken,
    buildExpiresIn,
};
