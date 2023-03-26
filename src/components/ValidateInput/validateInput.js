"use strict";
exports.__esModule = true;
/*!
 * validateInput
 * Copyright(c) 2022 KOTAFACTORY
 * Copyright(c) 2022 Don Nuwinda Udugala
 * CC Licensed
 */
var isAlphanumeric_1 = require("validator/lib/isAlphanumeric");
var validator_1 = require("validator");
var isByteLength = validator_1["default"].isByteLength;
var MessageManager_1 = require("../MessageManager");
var ValidateInput = /** @class */ (function () {
    function ValidateInput() {
        this.minByteSize = 1;
        this.maxByteSize = 75;
        this.minKeyByteSize = 1;
        this.maxKeyByteSize = 64;
        this.messageManager = new MessageManager_1["default"]();
    }
    ValidateInput.prototype.validateApiKey = function (key) {
        if (!isByteLength(key, { min: this.minKeyByteSize, max: this.maxKeyByteSize })) {
            this.messageManager.setMessage('Incorrect Key Byte size');
            return false;
        }
        this.messageManager.setMessage('Incorrect apiKey format.');
        return ((0, isAlphanumeric_1["default"])(key, 'en-US')) ? true : false;
    };
    /*
     * validate address. check byte length
     */
    ValidateInput.prototype.validateAddress = function (address) {
        if (!isByteLength(address, { min: this.minByteSize, max: this.maxByteSize })) {
            this.messageManager.setMessage('Incorrect Address Byte size');
            return false;
        }
        return true;
    };
    ValidateInput.prototype.getFormattedMessage = function () {
        return this.messageManager.getMessage(0);
    };
    /*
     * validate incomming post name. check byte length
     */
    ValidateInput.prototype.validatePostName = function (name) {
        if (!isByteLength(name, { min: this.minByteSize, max: this.maxByteSize })) {
            this.messageManager.setMessage('Incorrect post name and Byte size');
            return false;
        }
        return true;
    };
    return ValidateInput;
}());
exports["default"] = ValidateInput;
