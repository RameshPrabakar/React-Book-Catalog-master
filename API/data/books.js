const booksModel = require('./booksModel');

const booksData = {
    getAll: (args, res) => {
        booksModel.find({}, (err, data) => {
            if (err) return res(err, { 'status': 'Error on access book list' });

            if (data && data.length) {
                return res(err, data);
            } else {
                return res(err, data);
            }
        });
    },

    addNewBook: (params, res) => {

        const bookModule = new booksModel({
            id: parseInt(params.id),
            price: params.price,
            tittle: params.tittle,
            category: params.category,
            authorName: params.authorName,
            coverImage: params.coverImage,
            publisherName: params.publisherName
        });

        bookModule.save(params, (err, data) => {
            if (err) return res(err, { 'status': 'Error on save new book' });

            if (data && data.length) {
                return res(err, data);
            } else {
                return res(err, data);
            }
        });
    },

    delete: ({ id }, res) => {
        booksModel.remove({ id: id }, (err, data) => {
            if (err)
                return res(err, data);
            else
                return res(err, data);
        });
    },

    findAndUpdate: (params, res) => {

        const bookModule = new booksModel({
            id: parseInt(params.id) || null,
            price: params.price,
            tittle: params.tittle,
            category: params.category,
            authorName: params.authorName,
            publisherName: params.publisherName
        });

        booksModel.findOneAndUpdate({
            'id': params.id
        }, {
            id: params.id,
            price: params.price,
            tittle: params.tittle,
            category: params.category,
            authorName: params.authorName,
            publisherName: params.publisherName
        }, (err, data) => {
            if (data && data.length) {
                return res(err, data);
            } else {
                return res(err, data);
            }
        });
    }
}
module.exports = booksData;