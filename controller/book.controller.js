const db = require("../model");
const Book = db.books;
// const BookCategory = db.bookCategories;

// This is first method using $lookup to join books with categories
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("category");
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.status(200).json(books);
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).json({ message: "Error retrieving books", error });
  }
};
// this is second method using aggregation to join books with categories
// const getAllBooksWithAggregation = async (req, res) => {
//   try {
//     const books = await Book.aggregate([
//       {
//         $lookup: {
//           from: "bookcategories",
//           localField: "category",
//           foreignField: "_id",
//           as: "category",
//         },
//       },
//       {
//         $unwind: "$category",
//       },
//     ]);
//     if (books.length === 0) {
//       return res.status(404).json({ message: "No books found" });
//     }
//     res.status(200).json(books);
//   } catch (error) {
//     console.error("Error retrieving books:", error);
//     res.status(500).json({ message: "Error retrieving books", error });
//   }
// };
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).populate("category");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error retrieving book:", error);
    res.status(500).json({ message: "Error retrieving book", error });
  }
};

const createNewBook = async (req, res) => {
  const { title, price, author, category } = req.body;
  if (!title || !price || !category) {
    return res
      .status(400)
      .json({ message: "Title, price, and category are required" });
  }
  try {
    const newBook = new Book({ title, price, author, category });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Error creating book", error });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, price, author, category } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, price, author, category },
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Error updating book", error });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Error deleting book", error });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
};
