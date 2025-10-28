import React from "react";
import AddBookForm from "./components/AddBookForm";
import BookList from "./components/BookList";

const App = () => {
  return (
    <div className="app-bg min-vh-100 py-4">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary">Book Inventory</h1>
          <p className="text-muted">Manage your books with ease — Add, View, Delete, and Update</p>
        </div>

        <div className="card shadow-lg p-4 mb-4 rounded-4">
          <h4 className="text-secondary mb-3">Add a New Book</h4>
          <AddBookForm />
        </div>

        <div className="card shadow-lg p-4 rounded-4">
          <h4 className="text-secondary mb-3">Book List</h4>
          <BookList />
        </div>
      </div>
    </div>
  );
};

export default App;
