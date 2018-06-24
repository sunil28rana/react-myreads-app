import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

class ListShelves extends Component {
  static propTypes = {
    booksByShelf: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
    const { booksByShelf, updateShelf } = this.props;
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            { /* Display of BookShelves in home page accoriding to shelfves titles */ }
            {Object.keys(booksByShelf).map(shelf =>
              <BookShelf
                key={shelf}
                books={booksByShelf[shelf]}
                shelfTitle={shelf.replace( /([a-z])([A-Z])/g, '$1 $2' ).toLowerCase().split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')}
                updateShelf={updateShelf}
              />)}
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListShelves;
