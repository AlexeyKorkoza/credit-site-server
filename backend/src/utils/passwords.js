import { encryptor } from '../core/crypto';

const comparePasswords = (oldPassword, oldPasswordFromDb) => encryptor(oldPassword) === oldPasswordFromDb;

export {
    comparePasswords,
};
