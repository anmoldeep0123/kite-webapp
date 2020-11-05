import * as CryptoJS from 'crypto-js';
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class AesUtil {
  keySize: number;
  iterationCount: number;

  aesUtil(keySize, iterationCount) {
    this.keySize = keySize / 32;
    this.iterationCount = iterationCount;
  }

  generateKey(salt, passPhrase) {
    return CryptoJS.PBKDF2(
      passPhrase,
      CryptoJS.enc.Hex.parse(salt),
      {keySize: this.keySize, iterations: this.iterationCount});
  }

  encrypt(salt, iv, passPhrase, plainText) {
    const key = this.generateKey(salt, passPhrase);
    const encrypted = CryptoJS.AES.encrypt(
      plainText,
      key,
      {iv: CryptoJS.enc.Hex.parse(iv)});
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }
}
