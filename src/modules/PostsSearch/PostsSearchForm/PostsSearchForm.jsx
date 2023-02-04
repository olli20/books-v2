import {useState} from 'react';
import PropTypes from 'prop-types';

import styles from './posts-search-form.module.scss';

import initialState from './initialState';

const PostsSearchForm = ({onSubmit}) => {
    const [state, setState] = useState({...initialState});

    const handleChange = ({target}) => {
        const {name, value} = target;
        setState(prevState => {
            return {...prevState, [name]: value}
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({...state});
        setState({...initialState});
    }

    const {search} = state;

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Search posts</label>
                <input 
                    onChange={handleChange}
                    value={search}
                    name="search" 
                    placeholder="Search posts"
                    required />
            </div>
        </form>
    )
}

export default PostsSearchForm;

PostsSearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

// class PostsSearchForm extends Component {
//     state = {
//         search: "",
//     }

//     handleChange = ({target}) => {
//         const {name, value} = target;
//         this.setState({
//             [name]: value,
//         })
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();
//         const {onSubmit} = this.props;
//         onSubmit({...this.state});
//         this.reset();
//     }

//     reset() {
//         this.setState({
//             search: "",
//         })
//     }

//     render() {
//         const {search} = this.state;
//         const {handleChange, handleSubmit} = this;
//         return(
//             <form className={styles.form} onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="">Search posts</label>
//                     <input 
//                     onChange={handleChange}
//                     value={search}
//                     name="search" 
//                     placeholder="Search posts"
//                     required />
//                 </div>
                
//             </form>
//         )
//     }
// }