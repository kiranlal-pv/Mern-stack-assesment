import React, { useState } from "react";
import { api } from "../services/api";

const AddBookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/", book);
      alert("Book added successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to add book. Check all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-3">
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            className="form-control"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="author"
            placeholder="Author"
            className="form-control"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            className="form-control"
            value={book.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            className="form-control"
            value={book.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="form-control"
            value={book.stock}
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-4 px-4 fw-semibold">
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
