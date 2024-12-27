const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// 목록이 많지 않아서 라우팅, 미들웨어 처리하지 않음

app.get('/', async (req, res) => {
    const result = await db.doCallProcedure("CALL GET_AIRPORT_LIST()");
    res.send(result[0][0]);
}); 

app.listen(PORT, () => {
    console.log(`listen server ${PORT} port.`);
});
