import { useState } from "react";

import initialState from './initialState';
import styles from '../books.module.scss';
import PropTypes from "prop-types";

const BookForm = ({onSubmit}) => {
    const [state, setState] = useState({...initialState});

    const handleChange = ({target}) => {
        const {name, value} = target;
        setState(prevState => {
            return{...prevState, [name]: value}
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(title, author);
        onSubmit(title, author);
        setState({...initialState});
    }

    const {title, author} = state;

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="">Book title</label>
                <input 
                    onChange={handleChange} 
                    type="text" 
                    name="title" 
                    value={title}
                    placeholder="Book title"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="">Book author</label>
                <input 
                    onChange={handleChange} 
                    name="author" 
                    value={author}
                    type="text" 
                    placeholder="Author"
                />
            </div>                            
            <button type="submit">Add book</button>
        </form>
    )
}

export default BookForm;

// class BookForm extends Component {
//     state = {...initialState}

//     handleInputChange = ({target}) => {
//         const {name, value} = target;
//         this.setState({
//             [name]: value,
//         });
//     }

//     handleSubmit = event => {
//         event.preventDefault();

//         const {title, author} = this.state;
//         const result = this.props.onSubmit(title, author);

//         if(result) {
//             this.reset();
//         } 
//     }

//     reset = () => {
//         this.setState({...initialState});
//     }

//     render() {
//         const {handleInputChange, handleSubmit} = this;
//         const {title, author} = this.state;

//         return (
//             <form onSubmit={handleSubmit}>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="">Book title</label>
//                     <input 
//                         onChange={handleInputChange} 
//                         type="text" 
//                         name="title" 
//                         value={title}
//                         placeholder="Book title"
//                     />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="">Book author</label>
//                     <input 
//                         onChange={handleInputChange} 
//                         name="author" 
//                         value={author}
//                         type="text" 
//                         placeholder="Author"
//                     />
//                 </div>                            
//                 <button type="submit">Add book</button>
//             </form>
//         )
//     }
// }

