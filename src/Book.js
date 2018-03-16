import React from 'react';

/**
 * Represents a single book, including thumbnail image, title, author, and a control for selecting the shelf to which
 * the book should be assigned. The assignment itself is handled by a function passed in from a higher-order component.
 */
class Book extends React.Component {

  /**
   * Callback for when the user selects a new shelf for a book
   */
  onSelection = (selectObject) => {
    this.props.onStateChanged(this.props.bookToDisplay, selectObject.target.value);
  };

  render() {

    const { bookToDisplay } = this.props;

    const bookStyle = {
      width: 128,
      height: 193,
      backgroundImage: `url(${ bookToDisplay.imageLinks && ( bookToDisplay.imageLinks.thumbnail || bookToDisplay.imageLinks.smallThumbnail ) })`
    };

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={bookStyle}/>
          <div className="book-shelf-changer">
            <select value={ !bookToDisplay.shelf ? "none" : bookToDisplay.shelf } onChange={ this.onSelection }>
              <option value="default" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ bookToDisplay.title }</div>
        { bookToDisplay.authors && bookToDisplay.authors.map((author) => (
          <div key={ author } className="book-authors">{ author }</div>
        ))}
      </div>
    );
  }
}

export default Book;