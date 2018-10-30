import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {
  render = () => {
    const { title, books, updateBook } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book)=>(
              <li key={book.id}>
                <Book 
                  book={book} 
                  updateBook={updateBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf