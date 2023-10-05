const mongoose = require('mongoose');

const { Schema } = mongoose;
const AuthorsSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
},
    {
        timestamps: true,
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        },
    });

module.exports = Book = mongoose.model('authors', AuthorsSchema);