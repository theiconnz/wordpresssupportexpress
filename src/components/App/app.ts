/*!
 * app
 * Copyright(c) 2022 KOTAFACTORY
 * Copyright(c) 2022 Don Nuwinda Udugala
 * CC Licensed
 */
import * as dotenv from 'dotenv';
import Api from '../Api'

class App{
    private apiClass:any;

    constructor() {
        dotenv.config();
        this.apiClass = new Api();
    }
}
export default App;