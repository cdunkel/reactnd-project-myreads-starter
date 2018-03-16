import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((values) => {
      this.setState({ books: values });
    })
  }

  /**
   * Function called when updating the state of a book. This function will either add, remove, or update the book
   * depending on the book's current and updated shelf values.
   *
   * @param book    The book to update.
   * @param shelf   The new shelf to which the book should be assigned.
   */
  updateBook = (book, shelf) => {
    // Update the book on the server
    BooksAPI.update(book, shelf);

    if (!shelf || shelf === 'none') {
      this.removeBook(book);
    } else if (!book.shelf || book.shelf === 'none') {
      this.addBook(book, shelf);
    } else {
      this.changeShelf(book, shelf);
    }
  };

  /**
   * Updates the given book to the given shelf and adds it to the collection of books in the local state.
   *
   * @param book  The book to add.
   * @param shelf The shelf to which the book should be added.
   */
  addBook(book, shelf) {
    console.log("Adding book");
    book.shelf = shelf;
    this.setState(state => ({
      books: state.books.concat([ book ])
    }));
  }

  /**
   * Removes the given book from the collection of books in the local state.
   *
   * @param book  The book to remove.
   */
  removeBook(book) {
    console.log("Removing book");
    this.setState(state => ({
      books: state.books.filter((b) => {
        return b.id !== book.id;
      })
    }));
  }

  /**
   * Updates the shelf to which the given book has been set in the collection of books in the local state.
   *
   * @param book  The book to update.
   * @param shelf The new shelf to which the book should be assigned.
   */
  changeShelf(book, shelf) {
    console.log("Changing shelf for book");
    // Update the book in the local state
    this.setState(state => ({
      books: state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
        return b;
      })
    }));
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={ this.state.books } onUpdateBook={ this.updateBook }/>
        )}/>
        <Route exact path="/search" render={() => (
          <SearchBooks books={ this.state.books } onUpdateBook={ this.updateBook }/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
