const express = require('express');
const app = express();
const cors = require('cors');
const port = 5001;

app.use(cors());

var AuthController = require('./auth/AuthContorl');
app.use('/api/auth', AuthController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})