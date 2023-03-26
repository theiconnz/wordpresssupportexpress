/*!
 * app
 * Copyright(c) 2022 KOTAFACTORY
 * Copyright(c) 2022 Don Nuwinda Udugala
 * CC Licensed
 */
import mariadb from "mariadb";

class Mysqldriver {
    private conn: any | undefined = undefined;
    private mysqldata: object = {};

    constructor() {
        this.connectMysql();
    }

    async connectMysql(){
        try{
            // @ts-ignore
            const pool = mariadb.createPool({
                host:process.env.MY_SQL_DB_HOST,
                user:process.env.MY_SQL_DB_USER,
                password:process.env.MY_SQL_DB_PASSWORD,
                database:process.env.MY_SQL_DB_DATABASE,
                port:Number(process.env.MY_SQL_DB_PORT),
                debug: false
            })

            this.conn = await pool.getConnection();
        } catch (err:any) {
            //console.log(process.env);
            throw new Error(err);
        }
    }

    async runQuery(sqlString:string, values:[], key:string|number=0){
        var returnData = {};

        try {
            if(!this.conn) this.connectMysql();

            await this.conn.query(sqlString).then((data:any) =>{
                returnData=(key=='all')?data:data[0]
            })
        } catch (err) {
            throw err;
        } finally {
            if (this.conn) this.conn.end();
        }
        return returnData;
    }

    getConn(){
        return this.conn;
    }
}

export default Mysqldriver;