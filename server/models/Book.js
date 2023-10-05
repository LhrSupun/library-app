const mongoose = require('mongoose');

const { Schema } = mongoose;
const BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    author: {
        ref: 'author',
        type: Schema.Types.ObjectId,
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

module.exports = Book = mongoose.model('books', BookSchema);