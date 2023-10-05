const mongoose = require('mongoose');

const { Schema } = mongoose;
const AuthorsSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
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

AuthorsSchema.virtual('fullName').get(function () { return `${this.first_name} ${this.last_name ? this.last_name : ""}` })

module.exports = Author = mongoose.model('authors', AuthorsSchema);