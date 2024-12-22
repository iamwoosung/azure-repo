const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());


app.get('/api/test', (req, res) => {
    res.json({ message: 'hello world!' });
});

app.listen(PORT, () => {
    console.log(`listen server ${PORT} port.`);
});
