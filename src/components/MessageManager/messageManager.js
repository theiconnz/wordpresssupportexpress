"use strict";
/*!
 * messages
 * Copyright(c) 2022 KOTAFACTORY
 * Copyright(c) 2022 Don Nuwinda Udugala
 * CC Licensed
 */
exports.__esModule = true;
var MessageManager = /** @class */ (function () {
    function MessageManager() {
        this.returnStatus = 400;
        this.message = [];
    }
    /*
     * Set message
     */
    MessageManager.prototype.setMessage = function (message, clearMessage) {
        if (clearMessage === void 0) { clearMessage = false; }
        if (clearMessage) {
            this.message = [];
        }
        this.message.push(message);
    };
    MessageManager.prototype.getMessage = function (index) {
        if (index === void 0) { index = null; }
        if (typeof index === 'number') {
            return (this.message[index] !== undefined) ? this.message[index] : this.message;
        }
        return this.message;
    };
    return MessageManager;
}());
exports["default"] = MessageManager;
