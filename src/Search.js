import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import Spinner from './Spinner'
import { DebounceInput } from 'react-debounce-input'

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchQuery: "",
      books: [],
      loading: false,
    }   
  }
  handleChange = (event) => {
    var searchQuery = event.target.value
    this.setState({searchQuery: searchQuery});
    if(searchQuery==='')
        this.setState({books: []})
    else {
      this.setState({loading: true});
      BooksAPI.search(searchQuery)
        .then((res)=>{
          if(res.error)
            this.setState({
              books: [], 
              loading: false
            })
          else
            this.setState({
              books: res,
              loading: false
            });
        })
    }
  }
  checkShelf = (book) => {
    var bookInShelf = this.props.booksInShelves.filter((bookInShelf)=>(bookInShelf.id===book.id));
    if(bookInShelf.length===1)
      return bookInShelf[0].shelf;
    else
      return book.shelf;
  } 
  render() {
    const { updateBook } = this.props;
    return (
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
            <DebounceInput
              minLength={0}
              debounceTimeout={500}
              onChange={this.handleChange}
              value={this.state.searchQuery} 
              placeholder="Search by title or author"
            />
          </div>
        </div>
        {this.state.loading ? <Spinner /> : (
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.books.map((book)=>(
                <li key={book.id}>
                  <Book 
                    book={book} 
                    updateBook={updateBook}
                    shelf={this.checkShelf(book)}
                  />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>        
    );
  }
}

export default Search