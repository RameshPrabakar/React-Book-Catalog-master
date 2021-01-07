import React from "react";
import ModalNewBook from '../ModalNewBook/Index';
import BookList from '../Booklist/Index';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./BooksView.css";

const Booklist = ({ isLoaded, 
  books, 
  handleNewBook, 
  genres, 
  handleDeleteBook, 
  handleModifyBook
}) => (
  <section>
    {isLoaded === true ? (
      <div>
        <BookList
          books={books}
          handleDeleteBook={handleDeleteBook}
          handleModifyBook={handleModifyBook}
          genres={genres} 
        />
        <ModalNewBook
          handleNewBook={handleNewBook} />
      </div>
    ) : (
        <CircularProgress
          className="loadDataSpiner"
          color="secondary"
        />
      )}
  </section>
);

export default Booklist;
