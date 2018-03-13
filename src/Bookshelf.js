import React from 'react';
import Book from './Book';

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