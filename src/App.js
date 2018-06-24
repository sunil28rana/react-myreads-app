import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListShelves from './ListShelves'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage'
class BooksApp extends React.Component {
  state = {
    books: [],
  }


  componentDidMount() {
    BooksAPI.getAll()
    .then(books => {
      this.setState(() => ({
        books
      }))
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    this.setState((currentState) => ({
      books: currentState.books.filter( b => {
        return b.id !== book.id;
      })
    }))

    const newBooks = [];
    for (let b of this.state.books) {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
      newBooks.push(b);
    }

    this.setState((currentState) => ({
      books: newBooks
    }))

  }

  render() {
    const { books } = this.state;
    const booksByShelf = {};
    for (let book of books) {
      const shelf = book.shelf;
      if (booksByShelf[shelf]) {
        booksByShelf[shelf].push(book);
      } else {
        booksByShelf[shelf] = [book];
      }
    }

    return (
      <div className='app'>
        { /* Route for search page */ }
        <Route path='/search' render={() => (
            <SearchPage updateShelf={this.updateShelf} books={books} />
          )}/>

        { /* Route for search page */ }
        <Route exact path='/' render={() => (
            <ListShelves booksByShelf={booksByShelf} updateShelf={this.updateShelf} />

        )} />
      </div>
    )
  }
}

export default BooksApp
