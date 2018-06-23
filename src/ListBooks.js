import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  static propTypes = {
    booksByShelf: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { booksByShelf } = this.props;
    console.log(booksByShelf);
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(booksByShelf).map(shelf =>
              <BookShelf
                key={shelf}
                books={booksByShelf[shelf]}
                shelfTitle={shelf.replace( /([a-z])([A-Z])/g, '$1 $2' ).toLowerCase().split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')}
              />)}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    );
  }
}

export default ListBooks;
