const STORAGE_KEY = 'IAMLQY';
export default {
    fetch(key){
        let storage = this.getStorage();
        return storage[key];
    },
    save(key, val){
        let storage = this.getStorage();
        storage[key] = val;
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
    },
    clear(){
        window.sessionStorage.setItem(STORAGE_KEY, "")
    },
    getStorage(){
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
    }
}
