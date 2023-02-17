import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    organization: {
        type: Object
    },
    password_valid: {
        type: Number
    },
    likes: {
        type: Array
    },
    status: {
        type: String
    }
});

export default mongoose.model('User', User, 'users');