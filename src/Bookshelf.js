import React from 'react';
import Book from './Book';

/**
 * Represents a specific shelf of books with a specific title and array of books that will be displayed in a grid.
 * Also allows the parent component to pass in a function to be called when the state of a book changes.
 */
class Bookshelf extends React.Component {

  render() {

    const { shelfTitle, books, onUpdateBook } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelfTitle }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
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

export default Bookshelf;