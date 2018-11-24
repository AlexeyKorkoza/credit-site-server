import { encryptor } from '../core/crypto';

const comparePasswords = (oldPassword, oldPasswordFromDb) => encryptor(oldPassword) === oldPasswordFromDb;

const encryptPassword = password => encryptor(password);

export {
    comparePasswords,
    encryptPassword,
};
