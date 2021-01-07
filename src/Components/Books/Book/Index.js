import React from "react";
import ModalEditBook from '../ModalEditBook/Index';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import "./Book.css";

const Book = ({book, handleModifyBook, handleDeleteBook, genres}) => (
  <li key={book.id} className="bookCard">
        <Grid container spacing={4}>
          <Grid item xs={6} className="bookRightContainer">
            <h1 className="listStyle">Name : {book.tittle}</h1>
            <h1 className="listStyle">Category : {book.category}</h1>                
            <h1 className="listStyle">Author : {book.authorName}</h1>
            <h1 className="listStyle">Price : ${book.price}</h1>
            <h1 className="listStyle">Publisher : {book.publisherName}</h1>
            
          </Grid>
          <Grid item xs={4} className="bookRightContainer">
        <CardMedia>
          {
            book.coverImage != '' ?          
              (<img className="cover" src={`${process.env.PUBLIC_URL}/img/${book.coverImage}`} alt="Cover image" />)
            : ''
          }
          </CardMedia>
          </Grid>
          <Grid item xs={2} className="bookRightContainer">
          <ModalEditBook
              handleDeleteBook={handleDeleteBook}
              handleModifyBook={handleModifyBook}
              bookSelected={book}
              genres={genres}>
            </ModalEditBook>
          </Grid>
        </Grid>
      </li>
  );

export default Book;
