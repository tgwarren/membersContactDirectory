const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    parentName: {
        type: String,
        required: true
    },
    daughterName: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Member', memberSchema);