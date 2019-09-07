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

const buildTokens = (user, role) => {
    const accessToken = buildToken({ user_id: user.id, role });
    const expiresIn = buildExpiresIn(config.jwt.accessTokenExpiresIn);
    const refreshToken = buildToken({ user_id: user.id });

    return {
        accessToken,
        expiresIn,
        refreshToken,
    };
};

export default {
    buildTokens,
};
