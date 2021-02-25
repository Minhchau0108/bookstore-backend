const Book = require("../models/book");

const createBook = async (req, res) => {
  try {
    const { title, description, author, genres } = req.body;

    const book = new Book({
      title,
      description,
      author,
      genres,
      owner: req.userId,
    });

    await book.save();

    const populatedBook = await Book.populate(book, { path: "author" });

    res.status(201).json({
      success: true,

      data: populatedBook,

      message: `Book ${book.title} created!`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
const getBooks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const books = await Book.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("author", "-__v")
      .populate("genres", "-_id -__v");

    const count = await Book.countDocuments();
    res.status(200).json({
      success: true,
      data: books,
      totalPages: Math.ceil(count / limit),
      // message: `${books.length} books found!`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
const getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author", "-__v")
      .populate("genres", "-_id -__v");

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    )
      .populate("author", "-__v")
      .populate("genres", "-_id -__v");

    res.status(200).json({
      success: true,
      data: book,
      message: `book ${book.id} updated!`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
      success: true,
      data: book,
      message: `Deleted book ${book.id}`,
    });
  } catch (err) {
    res.status(400).json({
      success: fail,
      error: err.message,
    });
  }
};
const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ owner: req.userId })
      .populate("author")
      .populate("genres", "-_id -__v");

    res.status(200).json({
      success: true,

      data: books,

      message: `${books.length} books found!`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,

      error: err.message,
    });
  }
};
module.exports = {
  createBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getMyBooks,
};
