import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.route('/login').post(
    (req, res) => new AdminController().login(req, res)
);


export default adminRouter;