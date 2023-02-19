import * as express from 'express';
import { get_workshop_icons, main_image_to_base64, update_workshop_images, workshop_images } from '../imager';
import Workshop from '../models/workshop'
import User from '../models/user'
import Comment from '../models/comment'
import { base64_to_image, check_size, image_to_base64 } from '../imager';
export class WorkshopController {
    get = (req: express.Request, res: express.Response) => {
        Workshop.find({ date: { $gte: new Date() }, status: "active" }, (err, workshops) => {
            if (err) console.log(err);
            else {
                for (let workshop of workshops) {
                    workshop.main_icon = main_image_to_base64(workshop.name)
                    workshop.icons = get_workshop_icons(workshop.name);
                }
                res.json(workshops);
            }
        });
    }

    get_mine = (req: express.Request, res: express.Response) => {
        var username = req.body.username;
        if (!username) {
            res.json({ "message": "no username" });
            return;
        }

        Workshop.find({ "organizer": username }, (err, workshops) => {
            if (err) console.log(err);
            else {
                for (let workshop of workshops) {
                    workshop.main_icon = main_image_to_base64(workshop.name);
                }
                res.json(workshops);
            }
        });
    }

    get_attended = (req: express.Request, res: express.Response) => {
        var username = req.body.username;
        if (!username) {
            res.json({ "message": "no username" });
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

    attend = (req: express.Request, res: express.Response) => {
        var username = req.body.username;
        var workshop = req.body.workshop;
        Workshop.updateOne(
            { "name": workshop },
            {
                "$push": {
                    "attendees": username
                },
                "$pull": {
                    "signed": username
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.json({ "message": err });
                    return;
                }
                res.json({ "message": "success" });
            }
        );
    }

    remove_me = (req: express.Request, res: express.Response) => {
        var username = req.body.username;
        var workshop = req.body.workshop;
        Workshop.updateOne(
            { "name": workshop },
            {
                "$pull": {
                    "attendees": username
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.json({ "message": err });
                    return;
                }
                res.json({ "message": "success" });
            }
        );
    }

    sign_for = (req: express.Request, res: express.Response) => {
        var username = req.body.username;
        var workshop = req.body.workshop;
        Workshop.updateOne(
            { "name": workshop },
            {
                "$push": {
                    "signed": username
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.json({ "message": err });
                    return;
                }
                res.json({ "message": "success" });
            }
        );
    }

    unasign_for = (req: express.Request, res: express.Response) => {
        var username = req.body.username;
        var workshop = req.body.workshop;
        Workshop.updateOne(
            { "name": workshop },
            {
                "$pull": {
                    "signed": username
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.json({ "message": err });
                    return;
                }
                res.json({ "message": "success" });
            }
        );
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
            username: username,
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

        Comment.deleteOne({ "_id": id }, (err, comments) => {
            if (err) console.log(err);
            else {
                res.json({ "message": "success" });
            }
        });
    }

    get_comments = (req: express.Request, res: express.Response) => {
        let workshop = req.body.workshop;

        Comment.find({ workshop: workshop }, (err, comments) => {
            if (err) console.log(err);
            else {
                res.json(comments);
            }
        });
    }

    get_comments_for_user = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        Comment.find({ username: username }, (err, comments) => {
            if (err) console.log(err);
            else {
                res.json(comments);
            }
        });
    }

    chat_on_workshop = (req: express.Request, res: express.Response) => {
        var username = req.body.username;
        var workshop = req.body.workshop;
        Workshop.updateOne(
            { "name": workshop },
            {
                "$push": {
                    "chated": username
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.json({ "message": err });
                    return;
                }
                res.json({ "message": "success" });
            }
        );
    }

    create_workshop = (req: express.Request, res: express.Response) => {
        var name = req.body.name;
        var date = req.body.date;
        var place = req.body.place;
        var description = req.body.description;
        var long_description = req.body.long_description;
        var max_number = req.body.max_number;
        var organizer = req.body.organizer;
        var images = req.body.images;
        var status = "pending";
        var likes = 0;
        var signed = [];
        var attendees = [];
        var chated = [];

        if (!name || !date || !place || !description || !long_description || !max_number || !organizer) {
            res.json({ "message": "invalid parameters" });
            return;
        }

        Workshop.findOne({ 'name': name }, (err, workshop_exist) => {
            if (err) { console.log(err); }
            else {
                if (workshop_exist) {
                    res.json({ "message": "workshop already exists!" });
                    return;
                }

                const new_workshop = new Workshop({
                    "name": name,
                    "date": date,
                    "place": place,
                    "description": description,
                    "long_description": long_description,
                    "max_number": max_number,
                    "organizer": organizer,
                    "status": status,
                    "likes": likes,
                    "signed": signed,
                    "attendees": attendees,
                    "chated": chated,
                });
                new_workshop.save(function (err) {
                    if (err) {
                        res.json({ "message": "error while inserting!" });
                    } else {
                        workshop_images(images, new_workshop.name);
                        res.json({ "message": "success" });
                    }
                });
            }
        });

    }

    update_workshop = (req: express.Request, res: express.Response) => {
        var name = req.body.name;
        var date = req.body.date;
        var place = req.body.place;
        var description = req.body.description;
        var long_description = req.body.long_description;
        var max_number = req.body.max_number;
        var organizer = req.body.organizer;
        var images = req.body.images;

        if (!name || !date || !place || !description || !long_description || !max_number || !organizer) {
            res.json({ "message": "invalid parameters" });
            return;
        }
        Workshop.findOne({ 'name': name }, (err, workshop) => {
            if (err) { console.log(err); res.json({ "message": "workshop does not exist" });}
            else {
                if (workshop) {
                    workshop.name = name;
                    workshop.date = date;
                    workshop.place = place;
                    workshop.description = description;
                    workshop.long_description = long_description;
                    workshop.max_number = max_number;

                    update_workshop_images(images, name);

                    workshop.save();
                    res.json({ "message": "success" });
                } else {
                    res.json({ "message": "workshop does not exist" });
                    return;
                }
            }
        });

    }


}