/*
{
    "host": "localhost",
    "user": "root",
    "password": "1234",
    "database": "airport",
    "connectionLimit": 30, 
    "dateStrings": "date"
}

*/
const mysqlConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10),
    dateStrings: process.env.DB_DATE_STRINGS
};

module.exports = mysqlConfig;