import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookShelf extends Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }
  render() {
    const { shelfTitle, books, updateShelf } = this.props;
    return (

        <div className='bookshelf'>
          <h2 className='bookshelf-title'>{shelfTitle}</h2>
          <div className='bookshelf-books'>
            <ol className='books-grid'>
              {
                books.map(book =>
                <li key={book.id}>
                  <Book book={book} updateShelf={updateShelf}/>
                </li>
              )}
            </ol>
          </div>
        </div>
    );
  }
}

export default BookShelf;
