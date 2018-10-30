import React from 'react'
import * as BooksAPI from './BooksAPI'
import Spinner from './Spinner'

class BookDetails extends React.Component {
  state = {
    book: null,
    loading: true
  }

  componentDidMount = () => {
    BooksAPI.get(this.props.match.params.bookId)
      .then((res)=>{
        this.setState({
          book: res,
          loading: false
        });
      });
  }	
	render = () => {
		const book = this.state.book;
    if(this.state.loading===true)
      return (
        <Spinner />    
      );
    else	
			if(book!==null)
				return (
					<div className='book-details'>
						<a className="book-details-back"
							href='#'
							onClick={()=>{window.history.back()}}>Close</a>
	          <h1 className='book-details-title'>{book.title}</h1>

	        	<div className='book-info'>
						<div 
	          	className="book-details-cover" 
	          	style={{ 
	            	backgroundImage: `url(${book.imageLinks&&book.imageLinks.thumbnail})` 
	          	}}>
	        	</div>        	
	        		{book.description}
	        	</div>
					</div>
				)
			else
				return (<h2>Book not found</h2>);
	}
}

export default BookDetails