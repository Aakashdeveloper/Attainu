import express from 'express';
const app = express();
import cors from 'cors';
const port = process.env.PORT || 5001;
import AuthController from './auth/AuthContorl';

app.use(cors());

app.use('/api/auth', AuthController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})