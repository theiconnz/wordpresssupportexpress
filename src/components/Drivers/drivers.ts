/*!
 * mysql drivers
 * Copyright(c) 2022 KOTAFACTORY
 * Copyright(c) 2022 Don Nuwinda Udugala
 * CC Licensed
 */
import MysqlService from './lib/mysqldriver'

//import cors from 'cors'
const express = require('express');

class LoadDrivers{
    private app: any;
    private server: any;
    private mysqlDrive: any;

    constructor(props :any) {
        this.app = props;
        //this.app.use(cors);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : false}));
        this.mysqlDrive = new MysqlService();
    }

    getDriver()
    {
        return this.mysqlDrive;
    }
}

export default LoadDrivers;