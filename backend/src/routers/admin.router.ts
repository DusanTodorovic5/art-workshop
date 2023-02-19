import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.route('/login').post(
    (req, res) => new AdminController().login(req, res)
);

adminRouter.route('/get_users').get(
    (req, res) => new AdminController().get_users(req, res)
);

adminRouter.route('/accept_user').post(
    (req, res) => new AdminController().accept_user(req, res)
);

adminRouter.route('/reject_user').post(
    (req, res) => new AdminController().reject_user(req, res)
);

adminRouter.route('/delete_user').post(
    (req, res) => new AdminController().delete_user(req, res)
);

adminRouter.route('/get_all_workshops').get(
    (req, res) => new AdminController().get_all_workshops(req, res)
);

adminRouter.route('/accept_workshop').post(
    (req, res) => new AdminController().accept_workshop(req, res)
);

adminRouter.route('/reject_workshop').post(
    (req, res) => new AdminController().reject_workshop(req, res)
);

adminRouter.route('/delete_workshop').post(
    (req, res) => new AdminController().delete_workshop(req, res)
);


export default adminRouter;


