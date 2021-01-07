import React from "react";
import Book from '../Book/Index'
import "./Booklist.css";

const CheckList = ({books, 
  genres, 
  handleDeleteBook,
  handleModifyBook
  }) => (
  <section>
    <ul>
      {books.map(function (book) {
        return <Book
          key={book.id}
          book={book}
          handleModifyBook={handleModifyBook}
          handleDeleteBook={handleDeleteBook}
          genres={genres}
        />
      })}
    </ul>
  </section>
);

export default CheckList;
