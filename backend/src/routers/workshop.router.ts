import express from 'express';
import { WorkshopController } from '../controllers/workshop.controller';

const workshopRouter = express.Router();

workshopRouter.route('/get').get(
    (req, res) => new WorkshopController().get(req, res)
);

workshopRouter.route('/like').post(
    (req, res) => new WorkshopController().like(req, res)
);

workshopRouter.route('/unlike').post(
    (req, res) => new WorkshopController().unlike(req, res)
);

workshopRouter.route('/comment').post(
    (req, res) => new WorkshopController().comment(req, res)
);

workshopRouter.route('/get_comments').post(
    (req, res) => new WorkshopController().get_comments(req, res)
);

workshopRouter.route('/get_attended').post(
    (req, res) => new WorkshopController().get_attended(req, res)
);

workshopRouter.route('/get_comments_for_user').post(
    (req, res) => new WorkshopController().get_comments_for_user(req, res)
);  

workshopRouter.route('/remove_me').post(
    (req, res) => new WorkshopController().remove_me(req, res)
);

workshopRouter.route('/attend').post(
    (req, res) => new WorkshopController().attend(req, res)
);

workshopRouter.route('/unasign_for').post(
    (req, res) => new WorkshopController().unasign_for(req, res)
);

workshopRouter.route('/sign_for').post(
    (req, res) => new WorkshopController().sign_for(req, res)
);

workshopRouter.route('/get_mine').post(
    (req, res) => new WorkshopController().get_mine(req, res)
);

workshopRouter.route('/chat_on_workshop').post(
    (req, res) => new WorkshopController().chat_on_workshop(req, res)
);

workshopRouter.route('/create_workshop').post(
    (req, res) => new WorkshopController().create_workshop(req, res)
);

export default workshopRouter;