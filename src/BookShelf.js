import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import sortBy from 'sort-by'

function BookShelf(props) {
  const { shelfTitle, books, updateShelf } = props;
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{shelfTitle}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {
            books.sort(sortBy('title')).map(book =>
            <li key={book.id}>
              <Book book={book} updateShelf={updateShelf}/>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default BookShelf;
