/*!
 * app
 * Copyright(c) 2022 KOTAFACTORY
 * Copyright(c) 2022 Don Nuwinda Udugala
 * CC Licensed
 */

import cors from "cors";
import ValidateInput from "../ValidateInput";
import LoadDrivers from "../Drivers"
import Wordpress from '../Drivers/lib/wordpress'
const express = require('express');


class Api{
    private app: any;
    private server: any;
    private validator = new ValidateInput();
    private drivers : any;
    private wordpress: any;
    private mysqlDrive:any;
    private corsoptions = ["don-udugala.com","staging.don-udugala.com"]

    constructor() {
        this.app = express();
        this.app.use(cors())
        this.app.options(this.corsoptions, cors());
        //this.app.options('*', cors()) // include before other routes
        this.drivers = new LoadDrivers(this.app);
        this.mysqlDrive=this.drivers.getDriver();
        this.wordpress = new Wordpress(this.mysqlDrive);
        this.apiListenPort();
        this.apiListenDefault();
        this.apiListenAddress();
        this.apiGetIntData();
        this.apiGetPostbyName();
    }

    apiGetIntData(){
        this.app.get('/api/fetchinit', (req:any, res:any) => {
            (async () => {
                var result = await this.wordpress.getIntData();
                res.status(200).json(result)
            })();
        })
    }

    /*
     Listen to /api route
     */
    apiListenAddress(){
        this.app.get('/api/:key/address/:add', (req:any, res:any) => {
            let apikey = req.params.key;
            let address = req.params.add;
            let target = apikey;

            if(this.validator.validateApiKey(apikey) && this.validator.validateAddress(address) ){
                res.status(200).json({status:200, message: 'Valid key and address'})
            } else {
                res.status(400).json({status:400, message: this.validator.getFormattedMessage()})
            }
        })
    }

    apiGetPostbyName(){
        this.app.get('/api/getpost/:name', (req:any, res:any) => {
            let name = req.params.name;
            if(this.validator.validatePostName(name) && this.validator.validateAddress(name) ){
                (async () => {
                    var result = await this.wordpress.getPostByName(name);
                    res.status(200).json(result)
                })();
            } else {
                res.status(400).json({status:400, message: this.validator.getFormattedMessage()})
            }
        })
    }

    /*
     Any routes shouldn't allow to run
     */
    apiListenDefault(){
        this.app.get('/', (req:any, res:any) => {
            res.status(400).json({ status:400, message:'Error page' });
        })
    }

    /*
     API route is Listen to port
     */
    apiListenPort(){
        try{
            console.log(`Port ${process.env.EXPRESS_PORT}`)
            this.server = this.app.listen(process.env.EXPRESS_PORT, function () {});
        } catch (e:any) {
            throw new Error(e);
        }
    }

}

export default Api;