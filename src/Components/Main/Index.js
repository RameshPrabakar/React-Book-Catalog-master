import React from "react";
import BooksView from "../Books/BooksView/Index";
import { Switch, Route } from 'react-router-dom';
import "./Main.css";

const Main = ({
  books,
  genres,
  genresFiltered,
  handleDeleteBook,
  handleModifyBook,
  handleNewBook,
  handleDeleteGenre,
  handleAddGenre,
  handleSelectGenre,
  handleDeleteAllGenre,
  handleDeleteAllBook,
  handleDeleteGlobalGenre,
  isLoaded }) => (
    <main className="appMain">
      <Switch>
        <Route
          exact
          path="/home"
          render={() => {
            return (
              <BooksView
                genresFiltered={genresFiltered}
                books={books}
                genres={genres}
                handleAddGenre={handleAddGenre}
                handleDeleteBook={handleDeleteBook}
                handleModifyBook={handleModifyBook}
                handleNewBook={handleNewBook}
                isLoaded={isLoaded}
              />
            )
          }}
        />        
      </Switch>
    </main>
  );

export default Main;
