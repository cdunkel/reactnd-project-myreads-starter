import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((values) => {
      this.setState({ books: values });
    })
  }

  // Function called when updating the state of a book
  updateBook = (book, shelf) => {
    // Update the book on the server
    BooksAPI.update(book, shelf);

    // Update the book in the local state
    this.setState(state => ({
      books: state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
        return b;
      })
    }));
  };

  // TODO - Update this to use a router

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={ this.state.books } onUpdateBook={ this.updateBook }/>
        )}/>
        <Route exact path='/search' render={() => (
          <SearchBooks books={ this.state.books } onUpdateBook={ this.updateBook }/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
