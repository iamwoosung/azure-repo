const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const authRoutes = require('./routes/auth');
require('dotenv').config(({ path: 'pkg.env.dev' }));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
// app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`listen server ${PORT} port.`);
});