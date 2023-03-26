"use strict";
exports.__esModule = true;
var Wordpress = /** @class */ (function () {
    function Wordpress(props) {
        this.tableprefix = process.env.TABLEPREFIX;
        this.mysqldriver = props;
    }
    Wordpress.prototype.getConfiguration = function (name) {
        var query = "SELECT option_value as value FROM " + this.tableprefix + "options WHERE option_name=".concat(name);
        var result = this.mysqldriver.runQuery(query);
        console.log(result);
        return "done";
    };
    return Wordpress;
}());
exports["default"] = Wordpress;
