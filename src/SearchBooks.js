import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends React.Component {

  // TODO - Update this to use a router rather than update state
  state = {
    results: []
  };

  // TODO - Cross-reference the search results with what's already in our shelves to fill in the shelf property.
  // Anything that isn't in our shelf should be set to "none".

  onSearchChanged = (searchTerm) => {
    console.log("Search changed to " + searchTerm);
    if (searchTerm.length > 0) {
      BooksAPI.search(searchTerm).then((searchResults) => {
        if (searchResults.error) {
          console.log("Error returned: " + searchResults.error);
          this.setState({results: []});
        } else {
          console.log("Search returned " + searchResults.length + " results.");
          this.setState({results: searchResults});
        }
      });
    } else {
      this.setState({ results: [] });
    }
  };

  render() {

    const { onUpdateBook } = this.props;
    let searchResults = this.state.results;

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
            {searchResults.map((book) => (
              <li key={ book.id }>
                <Book bookToDisplay={ book } onStateChanged={ onUpdateBook }/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;