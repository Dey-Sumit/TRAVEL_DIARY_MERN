const mongoose = require('mongoose');
const { Schema } = mongoose;

// mongoosejs.com/docs/guide.html

const logEntrySchema = new Schema({
    title: {
        type: String,
        required: true
    }, // String is shorthand for {type: String}
    description: String,
    comments: String,
    photo: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    latitude: {
        type: Number,
        min: -90,
        max: 90
    },
    longitude: {
        type: Number,
        min: -180,
        max: 180
    },
    visitDate: {
        type: Date,
        required: true
    }
},
    {
        timestamps: true
    }

)
const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;