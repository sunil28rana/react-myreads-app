import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {

  }

  render() {
    const { book, updateShelf } = this.props;
    return (
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
          </div>
          <div className='book-shelf-changer'>
            <select
              onChange={event => updateShelf(book, event.target.value)}
              defaultValue={book.shelf || 'none'}>
              <option value='move' disabled>Move to...</option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{book.title}</div>
        <div className='book-authors'>{book.authors ? book.authors.join(' and ') : ''}</div>
      </div>
    );
  }
}

export default Book;
