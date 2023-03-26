/*!
 * validateInput
 * Copyright(c) 2022 KOTAFACTORY
 * Copyright(c) 2022 Don Nuwinda Udugala
 * CC Licensed
 */
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import validator from "validator";
import isByteLength = validator.isByteLength;
import MessageManager from "../MessageManager";


class ValidateInput {
    private messageManager : any;
    private minByteSize : number = 1;
    private maxByteSize : number = 75;
    private minKeyByteSize : number = 1;
    private maxKeyByteSize : number = 64;

    constructor() {
        this.messageManager = new MessageManager();
    }

    validateApiKey(key:string) : boolean
    {
        if (!isByteLength(key, {min: this.minKeyByteSize, max: this.maxKeyByteSize})) {
            this.messageManager.setMessage('Incorrect Key Byte size');
            return false;
        }
        this.messageManager.setMessage('Incorrect apiKey format.');
        return (isAlphanumeric(key,'en-US')) ? true : false;
    }

    /*
     * validate address. check byte length
     */
    validateAddress(address: string):boolean
    {
        if (!isByteLength(address, {min: this.minByteSize, max: this.maxByteSize})) {
            this.messageManager.setMessage('Incorrect Address Byte size');
            return false;
        }
        return true;
    }

    getFormattedMessage() : string{
        return this.messageManager.getMessage(0);
    }

    /*
     * validate incomming post name. check byte length
     */
    validatePostName(name: string):boolean
    {
        if (!isByteLength(name, {min: this.minByteSize, max: this.maxByteSize})) {
            this.messageManager.setMessage('Incorrect post name and Byte size');
            return false;
        }
        return true;
    }

}

export default ValidateInput;