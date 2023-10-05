const asyncHandler = require("express-async-handler");
const { isObjectIdOrHexString, Types } = require('mongoose');

// Load Author model
const Author = require('../../models/Author');

// @route GET authors
// @description seeds authors to database
// @access Public
exports.index = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const authors = await Author.find()
        .skip((page - 1) * perPage)
        .limit(perPage);
    res.json(authors);
});

exports.author_detail = asyncHandler(async (req, res, next) => {
    const authorId = req.params.id;
    if (!isObjectIdOrHexString(authorId)) {
        return res.status(400).json({ error: 'Invalid Author ID' });
    }

    const author = await Author.aggregate([
        {
            $match: {
                _id: new Types.ObjectId(authorId)
            }
        },
        {
            $lookup: {
                from: 'books',
                let: {
                    author_id: '$_id'
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$author', '$$author_id']
                            }
                        }
                    },
                    {
                        $project: {
                            author: 0,
                        }
                    }
                ],
                as: 'books'
            }
        },
        {
            $addFields: {
                fullName: { $concat: ['$first_name', ' ', '$last_name'] }
            }
        }
    ]);

    if (!author || author.length < 1) {
        return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author[0]);
});

exports.author_update = asyncHandler(async (req, res, next) => {
    const authorId = req.params.id;
    if (!isObjectIdOrHexString(authorId)) {
        return res.status(400).json({ error: 'Invalid Author ID' });
    }

    const author = await Author.findByIdAndUpdate(authorId, req.body, { new: true });

    if (!author) {
        return res.status(404).json({ error: 'Author Not found' });
    }
    res.json({ success: true });
});

exports.author_create = asyncHandler(async (req, res, next) => {
    const { first_name, last_name } = req.body;
    const author = new Author({ first_name, last_name });
    await author.save();
    res.json({ success: true });
});