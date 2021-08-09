"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* tslint:disable */
var axios_1 = require("axios");
var BIDECDSA_1 = require("./BIDECDSA");
var uuidv4 = require('uuid/v4');
/**
 * @export
 * @implements {IOneKosmos}
 */
var PayloadService = {
    postData: function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //make axios call {{client_api}}/api/r1/community/default/session/:sessionId/response
                //'https://1k-pilot.1kosmos.net/api/r1/community/default/session/c0a0d02a-d7ff-4c2a-9beb-4fd921bda204/response'
                return [2 /*return*/, 'ok'];
            });
        });
    },
    getStoredData: function (sessionId, publicKeyProvided) {
        return __awaiter(this, void 0, void 0, function () {
            var sp_pub, sp_pr, licenseKey, licenseKey_pilot, host, pPubkey, sharedKey, requestid, reqIDSTR, reqIdEnc, enc_license, sessionInfo, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sp_pub = 'PSJ1sEgVCWRmvZ4TkyBGoyieXl9p852LcejD5fOHUxBJV4Q8Z5a6i+VltTJUsfzmuTkDn5+846OIXpjp+7VE4A==';
                        sp_pr = 'ULcYSfv+5etTqBr2RxEF9HSJ33uJlkep9EL4+xzsWkI=';
                        licenseKey = '5809b7b7-886f-4c88-9061-59a2baf485be';
                        licenseKey_pilot = 'c77aa0ce-f00d-4843-86a9-38e6c1bf7d8e';
                        host = "https://1k-dev.1kosmos.net";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        axios_1["default"].defaults.headers = {
                            accept: 'application/json',
                            'X-TenantTag': '1kosmos'
                        };
                        return [4 /*yield*/, axios_1["default"].get(host + "/api/r1/community/default/publickeys")
                                .then(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    console.log(resp.data);
                                    return [2 /*return*/, resp.data.publicKey];
                                });
                            }); })];
                    case 2:
                        pPubkey = _a.sent();
                        sharedKey = BIDECDSA_1.BIDECDSA.createSharedKey(sp_pr, pPubkey);
                        requestid = {
                            uid: uuidv4(),
                            ts: (new Date().getTime()) / 1000,
                            appid: 'zenkeyservice'
                        };
                        reqIDSTR = JSON.stringify(requestid).replace(/"/g, '\'');
                        reqIdEnc = BIDECDSA_1.BIDECDSA.encrypt(reqIDSTR, sharedKey);
                        enc_license = BIDECDSA_1.BIDECDSA.encrypt(licenseKey_pilot, sharedKey);
                        //const encrtyptedPublicKey = BIDECDSA.encrypt(publicKey, sharedKey)
                        // const encrtyptedPublicKey = publicKey;
                        axios_1["default"].defaults.headers = {
                            requestid: reqIdEnc,
                            publicKey: sp_pub,
                            licensekey: enc_license,
                            'Content-Type': 'application/json',
                            accept: 'application/json',
                            'X-TenantTag': '1kosmos'
                        };
                        return [4 /*yield*/, axios_1["default"].get(host + "/api/r1/community/default/session/" + sessionId + "/response")
                                .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    console.log('Success:  ', data);
                                    // const decData = await BIDECDSA.decrypt(data.data.data, BIDECDSA.createSharedKey(sp_pr, publicKeyProvided));
                                    return [2 /*return*/, data.data.data];
                                });
                            }); })["catch"](function (error) {
                                console.log('Error: ', error);
                                return error;
                            })];
                    case 3:
                        sessionInfo = _a.sent();
                        return [2 /*return*/, sessionInfo];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, error_1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
};
exports["default"] = PayloadService;
module.export = PayloadService;
