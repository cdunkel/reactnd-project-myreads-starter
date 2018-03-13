import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class ListBooks extends React.Component {
  render() {

    const { books, onUpdateBook } = this.props;

    // Filter the full books list into just those to display on the shelves
    const currentlyReading = books.filter((book) => { return book.shelf === 'currentlyReading' });
    const wantToRead = books.filter((book) => { return book.shelf === 'wantToRead'});
    const read = books.filter((book) => {return book.shelf === 'read'});

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf shelfTitle='Currently Reading' books={ currentlyReading } onUpdateBook={ onUpdateBook }/>
            <Bookshelf shelfTitle='Want to Read' books={ wantToRead } onUpdateBook={ onUpdateBook }/>
            <Bookshelf shelfTitle='Read' books={ read } onUpdateBook={ onUpdateBook }/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;