import PropTypes from 'prop-types';
import styles from '../books.module.scss';


const BookList = ({books, removeBook}) => {
    const bookList = books.map(({id, title, author}) => 
        <li key={id}>{title}. Author: {author}<button onClick={() => removeBook(id)} type="button">Delete</button></li>)
    return (    
        <ol>
            {bookList}              
        </ol>
    )
}

export default BookList;

BookList.defaultProps = {
    books: [],
}

BookList.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired, 
        }
    )),
    removeBook: PropTypes.func.isRequired,
}


