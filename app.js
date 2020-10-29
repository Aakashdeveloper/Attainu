import express from 'express';
const app = express();
import cors from 'cors';
const port = process.env.PORT || 5001;
import AuthController from './auth/AuthContorl';

app.use(cors());

app.get('/',(req,res) => {
    res.status(200).send('Health Check Pass')
})

app.use('/api/auth', AuthController);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})