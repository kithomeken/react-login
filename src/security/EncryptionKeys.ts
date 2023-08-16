import * as crypto from 'crypto-js'

import StorageServices from "../services/StorageServices";
import {IV_BASE, KEY_BASE} from "../global/ConstantsRegistry";

class EncryptionKeys {
    getKeyBase() {
        const createdKey = StorageServices.getLocalStorage(KEY_BASE)

        if (createdKey === null || createdKey === undefined) {
            this.setEncryptionKeys()
            return  StorageServices.getLocalStorage(KEY_BASE)
        } else {
            return createdKey
        }
    }

    getIvBase() {
        const createdIv = StorageServices.getLocalStorage(IV_BASE)

        if (createdIv === null || createdIv === undefined) {
            this.setEncryptionKeys()
            return  StorageServices.getLocalStorage(IV_BASE)
        } else {
            return createdIv
        }
    }

    setEncryptionKeys() {
        /*
        * Create secure random encryption keys to be used
        * */
        const secureKeyBase = crypto.lib.WordArray.random(23)
        const secureIvBase = crypto.lib.WordArray.random(23)

        StorageServices.setLocalStorage(KEY_BASE, secureKeyBase)
        StorageServices.setLocalStorage(IV_BASE, secureIvBase)
    }
}

export default new EncryptionKeys()