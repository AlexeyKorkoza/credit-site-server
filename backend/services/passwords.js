import { encryptor } from '../helpers/crypto';

const checkOldPasswords = (oldPassword, oldPasswordFromDb) => encryptor(oldPassword) === oldPasswordFromDb;

export { checkOldPasswords };
