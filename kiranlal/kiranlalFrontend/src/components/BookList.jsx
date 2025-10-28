import React, { useEffect, useState } from "react";
import { api } from "../services/api";

const BookList = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/");
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await api.delete(`/${id}`);
      alert("🗑️ Book deleted!");
      fetchBooks();
    } catch (error) {
      alert("❌ Failed to delete book.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (books.length === 0) {
    return <p className="text-muted">No books found. Add a new book above.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle text-center">
        <thead className="table-primary">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>₹{book.price}</td>
              <td>{book.stock}</td>
              <td>
                <button className="btn btn-sm btn-outline-warning me-2">
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
