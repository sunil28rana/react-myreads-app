import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListShelves from './ListShelves'
import { Route, Link } from 'react-router-dom'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [
    ],
    showSearchPage: false,
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
    console.log('updated');
    // BooksAPI.getAll().then((books) => {
      // this.setState(() => ({
      //   books
      // }))

    // })
    this.setState((currentState) => ({
      books: currentState.books.filter( b => {
        return b.id !== book.id;
      })
    }))

    // this.setState((currentState) => ({
    //   books: currentState.books.push(book)
    //   }))
    const newBooks = [];
    for (let b of this.state.books) {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
      newBooks.push(b);
    }

    console.log('new books',newBooks);
    console.log('books are', this.state.books);

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
    };

    return (
      <div className='app'>
        <Route path='/search' render={() => (
          <div className='search-books'>
            <div className='search-books-bar'>
              <Link className='close-search' to='/'>Close</Link>

              <div className='search-books-input-wrapper'>
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}

                <input type='text' placeholder='Search by title or author'/>

              </div>
            </div>
            <div className='search-books-results'>
              <ol className='books-grid'>

              </ol>
            </div>
          </div>
        )} />
      <Route exact path='/' render={() => (
          <ListShelves booksByShelf={booksByShelf} updateShelf={this.updateShelf} />

        )} />
      </div>
    )
  }
}

export default BooksApp
