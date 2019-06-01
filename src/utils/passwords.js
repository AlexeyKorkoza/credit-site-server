import { encryptor } from '../core/crypto';

/**
 * @param oldPasswordFromDb {String}
 * @param oldPassword {String}
 * @return {boolean}
 */
const comparePasswords = (oldPasswordFromDb, oldPassword) => oldPasswordFromDb === encryptor(oldPassword);

const encryptPassword = password => encryptor(password);

export {
    comparePasswords,
    encryptPassword,
};
