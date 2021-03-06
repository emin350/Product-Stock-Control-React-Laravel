import { observable, action, makeAutoObservable } from "mobx";
import jwt_decode from 'jwt-decode';
import CryptoJS from 'crypto-js';
import sign from 'jwt-encode';

class AuthStore {

    appState = null;

    constructor() {
        makeAutoObservable(this, {
            appState: observable,
            saveToken: action,
            getToken: action
        });
    }

    saveToken = (appState) => {
        try {
            localStorage.setItem('appState', CryptoJS.AES.encrypt(sign(appState,"secret"),"emin-laravel-js").toString());
            this.getToken();
        }
        catch (e) {
            console.log(e);
        }
    }

    getToken = () => {
        try {
            const appStateData = localStorage.getItem("appState");
            if (appStateData) {
                var bytes = CryptoJS.AES.decrypt(appStateData,'emin-laravel-js');
                var orginalText = bytes.toString(CryptoJS.enc.Utf8);
                this.appState = jwt_decode(orginalText);
            }
            else {
                this.appState = null;
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

export default new AuthStore();