const mysql = require('mysql2/promise');
const config = require('./mysqlConfig');

// Connection Pool 생성
const pool = mysql.createPool(config);

const doCallProcedure = async function(query, param) {
    try {
        let connection = await pool.getConnection(async conn => conn);
        let result = await connection.query(query, param);
        // Connection 반납
        connection.release();
        // 결과값 리턴
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
};

module.exports = { 
    doCallProcedure
};