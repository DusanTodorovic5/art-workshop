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
    },
    organizer: {
        type: String
    },
    chated: {
        type: Array<String>
    },
    status: {
        type: String
    }
});

export default mongoose.model('Workshop', Workshop, 'workshops');