/*!
 * messages
 * Copyright(c) 2022 KOTAFACTORY
 * Copyright(c) 2022 Don Nuwinda Udugala
 * CC Licensed
 */

class MessageManager {
    private returnStatus : number = 400;
    private message : string[] = [];

    /*
     * Set message
     */
    setMessage(message:string, clearMessage:boolean=false):void{
        if(clearMessage){
            this.message = [];
        }
        this.message.push(message);
    }

    getMessage(index:number|null=null){
        if(typeof index === 'number' ){
            return (this.message[index]!==undefined)?this.message[index]:this.message;
        }
        return this.message;
    }

}

export default MessageManager;