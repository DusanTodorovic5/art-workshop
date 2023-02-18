import { Int32 } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Workshop = new Schema({
    name: {
        type: String
    },
    place: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    long_description:  {
        type: String
    },
    attendees: {
        type: Array
    },
    likes: {
        type: Number
    },
    main_icon: { 
        type: String
    },
    icons: { 
        type: Array
    },
    max_number: {
        type: Number
    },
    signed: {
        type: Array
    }
});

export default mongoose.model('Workshop', Workshop, 'workshops');