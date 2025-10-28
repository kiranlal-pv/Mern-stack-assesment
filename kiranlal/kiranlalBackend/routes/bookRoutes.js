import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// ✅ CREATE BOOK (POST /api/books)
router.post("/", async (req, res) => {
  try {
    const { title, author, genre, price, stock, publishedYear } = req.body;

    if (!title || !author || !genre || !price) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      price,
      stock,
      publishedYear,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Error adding book:", error.message);
    res.status(500).json({ message: "Server error while adding book" });
  }
});

// ✅ LIST BOOKS (GET /api/books)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({ message: "Server error while fetching books" });
  }
});

// ✅ UPDATE BOOK (PUT /api/books/:id)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, price, stock, publishedYear } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, price, stock, publishedYear },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error.message);
    res.status(500).json({ message: "Server error while updating book" });
  }
});

// ✅ DELETE BOOK (DELETE /api/books/:id)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error.message);
    res.status(500).json({ message: "Server error while deleting book" });
  }
});

export default router;

