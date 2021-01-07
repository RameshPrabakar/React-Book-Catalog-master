const mongoose = require('mongoose');
const schema = mongoose.Schema;

let BooksSchema = new schema({
    tittle: {
        type: String,
        required: [true, "can't be blank"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "can't be blank"],
        trim: true
    },
    authorName: {
        type: String,
        required: [true, "can't be blank"],
        trim: true
    },
    publisherName: {
        type: String,
        required: [true, "can't be blank"],
        trim: true
    },
    price: {
        type: String,        
        required: true
    },
    coverImage: {
        type: String
    },
    id: {
        type: Number
    }
}, {
    collection: 'Books'
});

module.exports = mongoose.model('booksModel', BooksSchema);