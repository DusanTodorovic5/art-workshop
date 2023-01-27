import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Message = new Schema({
    users: {
        type: Array<String>
    },
    messages: {
        type: Array
    }
});

export default mongoose.model('Message', Message, 'messages');