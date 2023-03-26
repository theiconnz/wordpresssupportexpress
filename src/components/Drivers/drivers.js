"use strict";
exports.__esModule = true;
/*!
 * mysql drivers
 * Copyright(c) 2022 KOTAFACTORY
 * Copyright(c) 2022 Don Nuwinda Udugala
 * CC Licensed
 */
var mysqldriver_1 = require("./lib/mysqldriver");
var express = require('express');
var LoadDrivers = /** @class */ (function () {
    function LoadDrivers(props) {
        this.app = props;
        //this.app.use(cors);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.mysqlDrive = new mysqldriver_1["default"]();
    }
    LoadDrivers.prototype.getDriver = function () {
        return this.mysqlDrive;
    };
    return LoadDrivers;
}());
exports["default"] = LoadDrivers;
