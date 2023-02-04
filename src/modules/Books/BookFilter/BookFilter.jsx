import PropTypes from 'prop-types';
// import styles from './book-filter.module.scss';
import styles from '../books.module.scss';


const BookFilter = ({filter, handleFilter}) => {
    return (
        <div className={styles.formGroup}>
            <label htmlFor="">Filter books</label>
            <input onChange={handleFilter} type="text" name="filter" value={filter} placeholder="Filter books"/>
        </div>
    )
}

export default BookFilter;