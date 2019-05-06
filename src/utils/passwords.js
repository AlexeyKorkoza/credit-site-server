import { encryptor } from '../core/crypto';

const comparePasswords = (oldPassword, oldPasswordFromDb) => oldPassword === encryptor(oldPasswordFromDb);

const encryptPassword = password => encryptor(password);

export {
    comparePasswords,
    encryptPassword,
};
