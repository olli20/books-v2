import { Component } from 'react';
import { nanoid } from 'nanoid';

import BookForm from './BookForm';
import BookList from './BookList';
import BookFilter from './BookFilter';

import styles from './books.module.scss';

class Books extends Component {
    state = {
        books: [],
        filter: "",
    }

    componentDidMount() {
        const books = JSON.parse(localStorage.getItem("my-books"));
        if(books?.length) {
            this.setState({books});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {books} = this.state;
        if(prevState.books.length !== books.length) {   
            localStorage.setItem("my-books", JSON.stringify(books));
        } 
    }

    addBook = (title, author) => {
        if(this.isDuplicate(title, author)) {
            alert("Alredy in the list");
            return false;
        }

        this.setState(prevState => {
            const {books} = prevState;
            const id = nanoid();
            return {books: [...books, {title, author, id}]}
        });
        return true;    
    }

    removeBook = (id) => {
        this.setState(({books}) => {
            const newBooks = books.filter(book => book.id !== id);
            return {books: newBooks}
        });
    }

    handleInputChange = ({target}) => {
        const {name, value} = target;
        this.setState({
            [name]: value,
        });
    }

    getFiltredBooks() {
        const {books, filter} = this.state;
        if(!filter) {
            return books;
        }
        const normalizedFilter = filter.toLowerCase();
        const result = books.filter(({title, author}) => {
            return (title.toLowerCase().includes(normalizedFilter) || author.toLowerCase().includes(normalizedFilter))
        })
        return result;
    }

    isDuplicate(title, author) {
        const normalizedTitle = title.toLowerCase();
        const normalizedAuthor = author.toLowerCase();
        const {books} = this.state;
        const result = books.find(({title, author}) => {
            return (title.toLowerCase() === normalizedTitle && author.toLowerCase() === normalizedAuthor)
        })
        return Boolean(result);
    }

    render() {
        const {handleInputChange, removeBook, addBook} = this;
        const {filter} = this.state;
        const books = this.getFiltredBooks();
        const isEmptyBooks = Boolean(books.length);
    
        return (
            <div>
                <h3>My Books</h3>
                <div className={styles.wrapper}>
                    <div className={styles.block}>
                        <h4>Add Book</h4>
                        <BookForm onSubmit={addBook} />
                    </div>
                    <div className={styles.block}>
                        <BookFilter filter={filter} handleInputChange={handleInputChange} /> 
                        {isEmptyBooks && <BookList books={books} removeBook={removeBook}/>}
                        {!isEmptyBooks && <p>There is no books</p>}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Books;