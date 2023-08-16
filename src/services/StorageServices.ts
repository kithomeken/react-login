/*
* Local storage service
* */

class StorageServices {
    getLocalStorage(key: string) {
        return localStorage.getItem(key)
    }

    setLocalStorage(key: string, value: any) {
        localStorage.setItem(key, value)
    }

    removeLocalStorage(key: string) {
        localStorage.getItem(key)
    }

    clearLocalStorage() {
        localStorage.clear()
    }
}

export default new StorageServices()