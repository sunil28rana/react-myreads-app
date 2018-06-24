import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }
  state = {
    query: '',
    results: []
  }
  search = (query) => {
    query = query.trim();
    if (query.length !== 0) {
      BooksAPI.search(query)
        .then(res => {
          // to handle error, results array is set empty
          if (res.error) {
            this.setState(() => ({
              results: []
            }))
          } else {
            // to show seleted value for booked that are already in shelves
            const booksWithShelf = res.map((book) => {
              const bookWithShelf = this.props.books.find((b) => b.id === book.id)
              return bookWithShelf || book
            })
            this.setState(() => ({
              results: booksWithShelf,
              query: query
            }))
          }

      })
    } else {
      this.setState(() => ({
        results: [],
        query: ''
      }))
    }
  }
  render() {
    const { results } = this.state;
    const { updateShelf } = this.props;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={event => this.search(event.target.value)}
              value={this.state.value}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {
               results.map(book => (
                <li key={book.id}>
                  { /* Book component */ }
                  <Book book={book} updateShelf={updateShelf}/>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
