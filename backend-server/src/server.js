const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db/mysql');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// 목록이 많지 않아서 라우팅, 미들웨어 처리하지 않음

app.get('/api/airport/list', async (req, res) => {
    const result = await db.doCallProcedure("CALL GET_AIRPORT_LIST()");
    res.send(result[0][0]);
}); 

app.get('/api/airport/now', async (req, res) => {
    const airportName = req.query.airportName;
    const result = await db.doCallProcedure("CALL GET_AIRPORT_TRAFFIC_NOW(?)", airportName);
    // console.log(result[0])
    res.send(result[0]);
}); 

app.listen(PORT, () => {
    console.log(`listen server ${PORT} port.`);
});
