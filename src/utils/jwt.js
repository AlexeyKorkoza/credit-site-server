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

const buildTokens = (user, role) => {
    const accessToken = buildToken({ user_id: user.id, role });
    const refreshToken = buildToken({ user_id: user.id });

    return {
        accessToken,
        refreshToken,
    };
};

export default {
    buildTokens,
};
