import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
);

userRouter.route('/password_change').post(
    (req, res) => new UserController().password_change(req, res)
);

userRouter.route('/forgot_password').post(
    (req, res) => new UserController().forgot_password(req, res)
);

userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
);

userRouter.route('/get_image').post(
    (req, res) => new UserController().get_image_for_user(req, res)
);

userRouter.route('/update').post(
    (req, res) => new UserController().update(req, res)
);

export default userRouter;