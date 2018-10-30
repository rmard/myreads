import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import BookDetails from './BookDetails'
import Search from './Search'
import Spinner from './Spinner'

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: true
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((res)=>{
        this.setState({
          books: res, 
          loading: false
        });
      });
  }

  updateBook = (event, updatedBook) => {
    this.setState({loading: true});
    const shelf = event.target.value;
    BooksAPI.update(updatedBook, shelf)
      .then((res)=>{
        /* Remove the updatedBook from state 
        * (if it already exists in one of the shelves) */
        this.setState((prevState)=>({
          books: prevState.books.filter((book)=>{
              return (book.id!==updatedBook.id)
          })
        }));
        /* Append the updatedBook on the state */
        BooksAPI.get(updatedBook.id)
          .then((res)=>{
            this.setState((prevState)=>({
              books: [...prevState.books, res],
              loading: false
            }));
          });
      });
  }

  booksInShelf = (shelf) => (
    this.state.books.filter((book=>(book.shelf===shelf)))
  )

  render() {
    if(this.state.loading===true) {
      return (
        <Spinner />    
      );
    }
    else {
      return (
        <div className="app">
          <Route path={`/book/:bookId`} component={BookDetails} />
          <Route path="/search" render={()=>(
            <Search 
              updateBook={this.updateBook}
              booksInShelves={this.state.books}
            />          
          )} />
          <Route exact path="/" render={()=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf 
                    title="Currently Reading" 
                    books={this.booksInShelf('currentlyReading')}
                    updateBook={this.updateBook}
                  />
                  <Bookshelf 
                    title="Want to Read" 
                    books={this.booksInShelf('wantToRead')} 
                    updateBook={this.updateBook}
                  />
                  <Bookshelf 
                    title="Read" 
                    books={this.booksInShelf('read')} 
                    updateBook={this.updateBook}
                  />
                </div>
              </div>
              <div className="open-search">
                <a href="/search">Add a book</a>
              </div>
            </div>
          )} />
        </div>
      );
    }
  }
}

export default BooksApp
