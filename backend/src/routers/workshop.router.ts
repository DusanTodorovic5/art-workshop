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


export default workshopRouter;