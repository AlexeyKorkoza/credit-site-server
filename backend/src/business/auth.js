import { encryptor } from '../core/crypto';

const checkOldPasswords = (oldPassword, oldPasswordFromDb) => encryptor(oldPassword) === oldPasswordFromDb;
