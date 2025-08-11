import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import { environment } from '../../../environments/environment';
import { DataEncrypt } from '../../core/interfaces/data-encrypt.model';

@Injectable({
    providedIn: 'root'
})
export class SecurityService {
    private jsEncrypt: JSEncrypt;
    private jsDecrypt: JSEncrypt;

    constructor() {
        this.jsEncrypt = new JSEncrypt();
        this.jsEncrypt.setPublicKey(environment.pbkv);
        this.jsDecrypt = new JSEncrypt();
        this.jsDecrypt.setPrivateKey(environment.pvkv);
    }

    public encrypt(value: any): DataEncrypt {
        const secretKey = this.generateRandomKeyCustom();
        const encrypted = this.encryptAES(JSON.stringify(value), secretKey);
        const data: DataEncrypt = {
            payload1: encrypted,
            payload2: this.encryptRsa(secretKey)
        }
        return data;
    }
    
    public decrypt<T>(value: DataEncrypt): T {
        const secretKey = this.decryptRsa(value.payload2);
        const decrypted = this.decryptAES(value.payload1, secretKey)
        return JSON.parse(decrypted);
    }

    private encryptRsa(value: string) {
        const encrypted = this.jsEncrypt.encrypt(value);
        if(!encrypted) {
            throw new Error('Ocurrió un error al encriptar los datos.');
        }
        return encrypted;
    }

    private decryptRsa(value: string): any {
        const decrypted = this.jsDecrypt.decrypt(value);
        if(!decrypted) {
            throw new Error('Ocurrió un error al desencriptar los datos.');
        }
        return decrypted;
    }

    private encryptAES(data: string, secretKey: string): string {
        const encrypted = CryptoJS.AES.encrypt(data, secretKey, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
    
    private decryptAES(encryptedData: string, secretKey: string): string {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    private generateRandomKeyCustom(length: number = 8) {
        const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = alphanumericChars.length;
        for (let i = 0; i < length; i++) {
            result += alphanumericChars.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}