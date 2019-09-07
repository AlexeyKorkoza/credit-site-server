import crypto from './crypto';

/**
 * @param oldPasswordFromDb {String}
 * @param oldPassword {String}
 * @return {boolean}
 */
const comparePasswords = (oldPasswordFromDb, oldPassword) => oldPasswordFromDb === crypto.encryptor(oldPassword);

const encryptPassword = password => crypto.encryptor(password);

export default {
    comparePasswords,
    encryptPassword,
};
