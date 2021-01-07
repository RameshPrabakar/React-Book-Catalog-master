import React, { Component } from 'react';
import Header from "../Header/Index";
import Main from "../Main/Index.js";
import { HttpService } from "../../shared/http-common";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      genres: [],
      genresFiltered: [],
      isLoaded: false,
      apiResponse: ""
    };
    this.handleNewBook = this.handleNewBook.bind(this);
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
    this.handleModifyBook = this.handleModifyBook.bind(this);
  }

  callAPI(url, method, formData) {
    const onSuccess = ( data ) => {
      let list = data || [{}];
      this.setState({ apiResponse: list, books: list });
    };

    const onFailure = error => {
      console.log('onFailure: ', error && error.response);
      console.error('onFailure: ', error && error.response || 'Error in API');
    };

    HttpService.get(url)
        .then(onSuccess)
        .catch(onFailure);
  }

  componentDidMount() {
    this.callAPI('/books/list', 'GET');
    setTimeout(
      function() {
        this.setState(prevState => {
          const newState = {
            isLoaded: true
          };
          return newState;
        });
      }.bind(this),
      2000
    );
  }

  getBookList() {
    const { books, genresFiltered, apiResponse } = this.state;
    let auxVar = [];
    for (const book of apiResponse) {
      const found = genresFiltered.indexOf(book.category) >= 0;
      if (found === true) {
        auxVar.push(book);
      }
    }
    if (auxVar.length !== 0) {
      return auxVar;
    } else {
      return apiResponse;
    }
  }

  handleNewBook(newBook) {

    newBook.id =
      this.state.books.length !== 0
        ? (this.state.books[this.state.books.length - 1].id || 0 ) + 1
        : 0;
    
    const data = new FormData();
    data.append('id', newBook.id);
    data.append('price', newBook.price);
    data.append('tittle', newBook.tittle);
    data.append('category', newBook.category);
    data.append('authorName', newBook.authorName);
    data.append('publisherName', newBook.publisherName);
    data.append('coverImage', newBook.selectedFile && newBook.selectedFile.name || '');

    if (newBook.selectedFile) { 
      data.append('file', newBook.selectedFile, newBook.selectedFile.name);
    }
    
    HttpService.post('/books/addNew', data)
      .then(( data ) => {
        let list = data || [{}];
        this.setState(prevState => ({
          books: prevState.books.concat(newBook),
          genres: []
        }));
      })
      .catch((error) => {
        console.log('onFailure: ', error && error.response);
        console.error('onFailure: ', error && error.response || 'Error in API');
      });
  }

  handleModifyBook(newBook) {

    let data = {
      id: newBook.id,
      price: newBook.price,
      tittle: newBook.tittle,
      category: newBook.category,
      authorName: newBook.authorName,
      publisherName: newBook.publisherName
    }

    HttpService.post('/books/update', data)
      .then((data) => {
        let list = data || [{}];
        this.setState(prevState => ({
          books: prevState.books.concat(newBook),
          genres: []
        }));
      })
      .catch((error) => {
        console.log('onFailure: ', error && error.response);
        console.error('onFailure: ', error && error.response || 'Error in API');
      });
    
    this.setState(prevState => {
      const newState = {
        books: prevState.books.map((book, index) => {
          if (book.id === newBook.id) {
            book = {
              id: newBook.id,
              price: newBook.price,
              tittle: newBook.tittle,
              category: newBook.category,
              authorName: newBook.authorName,
              publisherName: newBook.publisherName
            };
          }
          return book;
        })
      };
      return newState;
    });
  }

  handleDeleteBook(idBook) {

    HttpService.post('/books/delete', { id: idBook })
      .then((data) => {

        this.setState(prevState => {
          const newState = {
            books: prevState.books.filter(book => book.id !== parseInt(idBook))
          };
          return newState;
        });

      })
      .catch((error) => {
        console.log('onFailure: ', error && error.response);
        console.error('onFailure: ', error && error.response || 'Error in API');
    });  
    
  }

  render() {
    const { genres, genresFiltered, isLoaded } = this.state;

    return (
      <div className="Header">
        <Header />
        <Main 
          books={this.getBookList()}
          handleModifyBook={this.handleModifyBook}
          genres={genres}
          genresFiltered={genresFiltered}
          isLoaded={isLoaded}
          handleNewBook={this.handleNewBook}
          handleDeleteBook={this.handleDeleteBook}
        />
      </div>
    );
  }
}

export default HomePage;