import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.router';
import workshopRouter from './routers/workshop.router';
import adminRouter from './routers/admin.router';

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '2mb'}));

mongoose.connect("mongodb://127.0.0.1:27017/pia_projekat");

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("db connection ok");
});

const router = express.Router();

router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/workshop', workshopRouter);


app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));