"use strict";
exports.__esModule = true;
exports.BIDECDSA = void 0;
/* tslint:disable */
var crypto = require('crypto');
var ALGO = 'aes-256-gcm';
//ref original https://gist.github.com/rjz/15baffeab434b8125ca4d783f4116d81
var BIDECDSA = /** @class */ (function () {
    function BIDECDSA() {
    }
    BIDECDSA.ecdsaHelper = function (method, str, key) {
        if (method === 'encrypt') {
            return this.encrypt(str, key);
        }
        if (method === 'decrypt') {
            return this.decrypt(str, key);
        }
        return '';
    };
    BIDECDSA.encrypt = function (str, key64) {
        var key = Buffer.from(key64, 'base64');
        var iv;
        {
            var iv_bytes = crypto.randomBytes(16);
            iv = Buffer.from(iv_bytes, 'utf8');
        }
        var cipher = crypto.createCipheriv(ALGO, key, iv);
        var enc_b64 = cipher.update(str, 'utf8', 'base64');
        enc_b64 += cipher.final('base64');
        var enc_bytes = Buffer.from(enc_b64, 'base64');
        var authTagBytes = cipher.getAuthTag();
        //concat iv, enc_bytes, authTag
        var resultBuffer = Buffer.concat([iv, enc_bytes, authTagBytes]);
        var resultB64 = resultBuffer.toString('base64');
        return resultB64;
    };
    BIDECDSA.decrypt = function (enc_b64, key64) {
        var key = Buffer.from(key64, 'base64');
        var enc_buffer = Buffer.from(enc_b64, 'base64');
        var iv = enc_buffer.slice(0, 16);
        var authTag = enc_buffer.slice(enc_buffer.length - 16, enc_buffer.length);
        enc_buffer = enc_buffer.slice(iv.length, (enc_buffer.length - authTag.length));
        var enc = enc_buffer.toString('base64');
        var decipher = crypto.createDecipheriv(ALGO, key, iv);
        decipher.setAuthTag(authTag);
        var str = decipher.update(enc, 'base64', 'utf8');
        str += decipher.final('utf8');
        console.log(str);
        return str;
    };
    BIDECDSA.createSharedKey = function (prKey, pKey64) {
        var set1 = crypto.createECDH('secp256k1');
        set1.setPrivateKey(Buffer.from(prKey, 'base64'));
        /* convert other party's public key to encryption public key : ref php code */
        var ret = '';
        {
            var pBuffer = Buffer.from(pKey64, 'base64');
            var pHex = '04' + pBuffer.toString('hex');
            ret = set1.computeSecret(pHex, 'hex', 'base64');
        }
        return ret;
    };
    BIDECDSA.generateKeyPair = function () {
        var set1 = crypto.createECDH('secp256k1');
        set1.generateKeys();
        var prKey = set1.getPrivateKey().toString('base64');
        var pKey = Buffer.from(set1.getPublicKey().toString('hex').substr(2), 'hex').toString('base64');
        return [prKey, pKey];
    };
    return BIDECDSA;
}());
exports.BIDECDSA = BIDECDSA;
