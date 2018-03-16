import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

/**
 * Higher-order component for displaying a view allowing the user to search for books.
 */
class SearchBooks extends React.Component {

  state = {
    query: '',
    results: []
  };

  /**
   * Function called when the search term entered by the user into the search input is updated. This function handles
   * calling the search API and managing the results of that query, if any.
   *
   * @param searchTerm  The search string entered by the user.
   */
  onSearchChanged = (searchTerm) => {

    this.setState({ query: searchTerm });

    const { books } = this.props;

    if (searchTerm.length > 0) {
      BooksAPI.search(searchTerm).then((searchResults) => {
        if (searchResults.error) {
          this.setState({results: []});
        } else {
          // Update the shelf parameters for the search results based on the local array of books
          let shelvedResults = this.updateShelvesFromBooks(searchResults, books);
          // Update the local state
          this.setState({results: shelvedResults});
        }
      });
    } else {
      this.setState({ results: [] });
    }
  };

  /**
   * Cross-references the search results with the existing books in the local state, updating the shelf property of
   * any search results to match that in the local state.
   *
   * @param searchResults An array of books that resulted from a serach.
   * @param books The array of books in the local state.
   * @return  An array of the same books in searchResults, but with their shelf parameters set.
   */
  updateShelvesFromBooks(searchResults, books) {
    return searchResults.map(result => {
      let existingBook = books.filter(b => {
        return b.id === result.id;
      })[0];
      if (existingBook && existingBook.shelf) {
        result.shelf = existingBook.shelf;
      } else {
        result.shelf = 'none';
      }
      return result;
    });
  }

  /**
   * Function called when a user updates the shelf to which a book is assigned.
   */
  onUpdateBook = (book, shelf) => {
    // Update our local state
    this.setState(state => ({
      results: state.results.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
        return b;
      })
    }));

    // Call the passed-in update function
    this.props.onUpdateBook(book, shelf);
  };

  render() {

    // let searchResults = this.state.results;
    const { results } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.onSearchChanged(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map((book) => (
              <li key={ book.id }>
                <Book bookToDisplay={ book } onStateChanged={ this.onUpdateBook }/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;