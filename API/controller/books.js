var booksModel = require('../data/books');

var booksController = {
    getAll: (params, callback) => {
        booksModel.getAll(params, (err, data) => {
            callback(err, data);
        });
    },    
    addNewBook: (params, callback) => {
        booksModel.addNewBook(params, (err, data) => {
            callback(err, data);
        });
    },
    delete: (params, callback) => {
        booksModel.delete(params, (err, data) => {
            callback(err, data);
        });
    },
    findAndUpdate: (params, callback) => {
        booksModel.findAndUpdate(params, (err, data) => {
            callback(err, data);
        });
    }
}
module.exports = booksController;