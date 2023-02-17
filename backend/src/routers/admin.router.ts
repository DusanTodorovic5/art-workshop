import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.route('/login').post(
    (req, res) => new AdminController().login(req, res)
);

adminRouter.route('/get_users').get(
    (req, res) => new AdminController().get_users(req, res)
);


export default adminRouter;


