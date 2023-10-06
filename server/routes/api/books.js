const asyncHandler = require("express-async-handler");
const { isObjectIdOrHexString } = require('mongoose');
const seeds = require('../../books.json');

// Load models
const Book = require('../../models/Book');
const Author = require('../../models/Author');

// @route GET books
// @description seeds books to database
// @access Public
exports.index = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const books = await Book.aggregate([
        {
            $lookup: {
                from: 'authors',
                let: {
                    author_id: '$author'
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$_id', '$$author_id']
                            }
                        }
                    },
                    {
                        $project: {
                            // _id: 0,
                            fullName: { $concat: ['$first_name', ' ', '$last_name'] }
                        }
                    }
                ],
                as: 'author'
            },
        },
        {
            $unwind: '$author'
        },
        {
            $project: {
                name: 1,
                name: 1,
                isbn: 1,
                description: 1,
                author: "$author.fullName",
                authorId:"$author._id"
            }
        },
        {
            $skip: (page - 1) * perPage
        },
        {
            $limit: perPage
        }
    ])

    res.json(books);

});

exports.seeding = asyncHandler(async (req, res, next) => {
    // empty collections
    await Book.deleteMany({});
    await Author.deleteMany({});
    const data = seeds.books;
    const author_data = data.map(book => ({
        first_name: book.author.split(' ').filter(Boolean)[0],
        last_name: book.author.split(' ').filter(Boolean).slice(-1)[0],
    }));
    const options = { ordered: true };
    const result = await Author.insertMany(author_data, options);
    const book_data = data.map(book => ({
        isbn: book.isbn,
        name: book.title,
        author: result.find(r => r.fullName === book.author)?._id,
        description: book.description
    }));
    const book_saved = await Book.insertMany(book_data, options);
    console.log({ book_saved });
    res.json({ success: true });
});


exports.book_detail = asyncHandler(async (req, res, next) => {
    const bookId = req.params.id;
    if (!isObjectIdOrHexString(bookId)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }

    const book = await Book.findById(bookId).select("name isbn description author").populate({
        path: 'author',
        model: 'authors',
        select: 'first_name last_name'
    });

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    res.json({
        name: book?.name,
        isbn: book?.isbn,
        description: book?.description,
        author: book?.author?.fullName,
        authorId: book?.author?._id
    });
});

exports.book_create = asyncHandler(async (req, res, next) => {
    const { name, isbn, author } = req.body;
    if (!isObjectIdOrHexString(author)) {
        return res.status(400).json({ error: 'Invalid Author ID' });
    }
    const book = new Book({
        name, isbn, author
    });
    await book.save();
    res.json({ success: true });
});

exports.book_update = asyncHandler(async (req, res, next) => {
    const bookId = req.params.id;
    if (!isObjectIdOrHexString(bookId)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }

    const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ success: true });

});