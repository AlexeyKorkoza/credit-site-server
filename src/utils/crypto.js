import config from 'config';
import crypto from 'crypto';

const {
    crypto: {
        algorithm,
        password: passwordCrypto,
    },
} = config;

const encryptor = text => {
    const cipher = crypto.createCipher(algorithm, passwordCrypto);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
};

const decryptor = text => {
    const decipher = crypto.createDecipher(algorithm, passwordCrypto);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');

    return dec;
};

export default {
    encryptor,
    decryptor,
};
