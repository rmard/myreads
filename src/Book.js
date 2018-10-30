import React from 'react'

class Book extends React.Component {
  render = () => {
    var book = this.props.book;
    /* The book is in the shelf passed through props.
      If the prop doesn't exist, the book is in the shelf of the object's param
    */
    var shelf = this.props.shelf ? this.props.shelf : book.shelf;
    if(shelf === undefined) {
      shelf = 'none';
    }
    return (
      <div className="book">
        <div className="book-top">
          <a href={`/book/${book.id}`}>
            <div 
              className="book-cover" 
              style={{ 
                width: 128, 
                height: 193, 
                backgroundImage: `url(${book.imageLinks&&book.imageLinks.smallThumbnail})` 
              }}>
            </div>
          </a>
          <div className="book-shelf-changer">
            <select 
              onChange={(event)=>this.props.updateBook(event, book)} 
              value={shelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

export default Book;