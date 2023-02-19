import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.router';
import workshopRouter from './routers/workshop.router';
import adminRouter from './routers/admin.router';
import { WebSocketServer } from 'ws';
import { MessageController } from './controllers/message.controller';

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '4mb' }));

mongoose.connect("mongodb://127.0.0.1:27017/pia_projekat");

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("db connection ok");
});

const router = express.Router();

router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/workshops', workshopRouter);

app.use('/', router);

const wss = new WebSocketServer({ port: 4001 });
var clients = new Map();

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    new MessageController().handle(data, ws, clients);
  });

  ws.on('close', function close() {
    clients.delete(ws);
  });
});

app.listen(4000, () => console.log(`Express server running on port 4000`));