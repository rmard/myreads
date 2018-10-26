import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((res)=>{
        this.setState({books: res});
      });
  }

  updateBook = (event, updatedBook) => {
    const shelf = event.target.value;
    BooksAPI.update(updatedBook, shelf)
      .then((res)=>{
        this.setState((prevState)=>({
          books: prevState.books.map((book)=>{
            if(book.id===updatedBook.id)
              book.shelf = shelf;
            return book;
          })
        }));
      });
  }

  render() {
    /* TODO: retirar essa chamada */
    // BooksAPI.getAll()
    //   .then(res=>{
    //     console.log(res);
    //   });
    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" href="/">Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>          
        )} />
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf title="Currently Reading" books={this.state.books.filter((book=>(book.shelf==='currentlyReading')))} updateBook={this.updateBook}/>
                <Bookshelf title="Want to Read" books={this.state.books.filter((book=>(book.shelf==='wantToRead')))} updateBook={this.updateBook}/>
                <Bookshelf title="Read" books={this.state.books.filter((book=>(book.shelf==='read')))} updateBook={this.updateBook}/>
              </div>
            </div>
            <div className="open-search">
              <a href="/search">Add a book</a>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
