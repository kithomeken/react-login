import * as crypto from 'crypto-js'

import EncryptionKeys from "./EncryptionKeys"
import StorageServices from "../services/StorageServices";

class Crypto {
    encryptDataUsingAES256(plainText: any) {
        let iv: any
        iv = EncryptionKeys.getIvBase()
        let key = EncryptionKeys.getKeyBase()
        
        return crypto.AES.encrypt(plainText, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        }).toString();
    }

    decryptDataUsingAES256(cipherText: any) {
        try {
            let iv: any
            iv = EncryptionKeys.getIvBase()
            let key = EncryptionKeys.getKeyBase()

            return crypto.AES.decrypt(cipherText, key, {
                keySize: 128 / 8,
                iv: iv,
                mode: crypto.mode.CBC,
                padding: crypto.pad.Pkcs7
            }).toString(crypto.enc.Utf8)
        } catch (e) {
            /*
            * Encryption keys used to decrypt the data
            * do not match the keys used when encrypting
            * the data.
            *
            * Fallback: Clear existing key and prompt
            * user to sign in afresh setting new
            * encryption keys.
            * */

            StorageServices.clearLocalStorage()
            /*
            * TODO: Clear sanctum cookie too.
            * */
        }
    }
}

export default new Crypto()