import express from 'express';
import { WorkshopController } from '../controllers/workshop.controller';

const workshopRouter = express.Router();

workshopRouter.route('/get').get(
    (req, res) => new WorkshopController().get(req, res)
);


export default workshopRouter;