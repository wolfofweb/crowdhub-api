import mysql from "mysql"

export const db = mysql.createPool({
    connectionLimit:10,
    host: process.env.MYSQLHOST||"containers-us-west-59.railway.app",
    user:process.env.MYSQLUSER|| "root",
    password: process.env.MYSQLPASSWORD||"qUj09HMkk9kOlZfWID6V",
    database: process.env.MYSQLDATABASE||"railway",
    port:process.env.MYSQLPORT||"8065"
})

