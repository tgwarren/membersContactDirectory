const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    start: Date,   
    end: Date,
    
})

module.exports = mongoose.model('Event', eventSchema);