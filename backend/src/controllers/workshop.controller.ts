import * as express from 'express';
import { main_image_to_base64 } from '../imager';
import Workshop  from '../models/workshop'
import User  from '../models/user'
import Comment from '../models/comment'
export class WorkshopController { 
    get = (req: express.Request, res: express.Response) => {
        Workshop.find({ date: { $gte: new Date() } }, (err, workshops) => {
            if (err) console.log(err);
            else {
                for (let workshop of workshops) {
                    workshop.main_icon = main_image_to_base64(workshop.name)
                }
                res.json(workshops);
            }
        });
    }

    get_attended = (req: express.Request, res: express.Response) => {
        var username = req.body.username;
        if (!username) {
            res.json({"message":"no username"});
            return;
        }

        Workshop.find({ attendees: username }, (err, workshops) => {
            if (err) console.log(err);
            else {
                for (let workshop of workshops) {
                    workshop.main_icon = main_image_to_base64(workshop.name);
                }
                res.json(workshops);
            }
        });
    }

    like = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let name = req.body.name;

        Workshop.updateOne(
            { "name": name }, 
            { $inc: { likes: 1 } }
        );

        User.updateOne(
            { "username": username }, 
            { "$push": { "likes": name } }
        );

        res.json({ "message": "success" });
    }

    unlike = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let name = req.body.name;

        User.updateOne(
            { "username": username }, 
            { "$pull": { "likes": name } }
        );

        Workshop.updateOne(
            { "name": name }, 
            { $inc: { likes: -1 } }
        );

        res.json({ "message": "success" });
    }

    comment = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let workshop = req.body.workshop;
        let text = req.body.text;

        let _comment = new Comment({
            username:username,
            workshop: workshop,
            text: text
        });

        _comment.save(function (err) {
            if (err) {
                res.json({ "message": "error while inserting!" });
                return;
            } 
            res.json({ "message": "success" });
        });
    }

    delete_comment = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        Comment.deleteOne({"_id" : id},(err, comments) => {
            if (err) console.log(err);
            else {
                res.json({"message": "success"});
            }
        });
    }

    get_comments = (req: express.Request, res: express.Response) => {
        let workshop = req.body.workshop;
        
        Comment.find({ workshop: workshop}, (err, comments) => {
            if (err) console.log(err);
            else {
                res.json(comments);
            }
        });
    }

    get_comments_for_user = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        
        Comment.find({ username: username}, (err, comments) => {
            if (err) console.log(err);
            else {
                res.json(comments);
            }
        });
    }
}