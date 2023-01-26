import { Int32 } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Comment = new Schema({
    workshop: {
        type: String
    },
    username: {
        type: String
    },
    text: {
        type: String
    },
});

export default mongoose.model('Comment', Comment, 'comments');