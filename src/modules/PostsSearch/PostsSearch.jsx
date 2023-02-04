import {useState, useEffect} from 'react';
 
import Modal from '../../shared/components/Modal'
import PostsSearchForm from './PostsSearchForm';
import PostsList from './PostsList';
import PostDetails from './PostDetails';

import {searchPosts} from '../../shared/services/posts-api';

import styles from './posts-search.module.scss';

const PostsSearch = () => {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [postDetails, setPostDetails] = useState(null);

    useEffect(() => {
        if(search) {
            const fetchPosts = async () => {
                try {
                    setLoading(true);
                    const data = await searchPosts(search, page);
                    setItems(prevItems => ([...prevItems, ...data]));
                }
                catch(error) {
                    setError(error.message)
                }
                finally {
                    setLoading(false);
                }
            }
            fetchPosts(search);
        }
    }, [search, page, setLoading, setItems, setError, searchPosts])

    const onSearchPosts = ({search}) => {
        setSearch(search);
        setItems([]);
        setPage(1);
    }

    const showPost = (data) => {
        console.log(data);
        setPostDetails(data);
        setShowModal(true);
    }

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    }

    const closeModal = () => {
        setPostDetails(null);
        setShowModal(false);
    }

    return (
        <>
            <PostsSearchForm onSubmit={onSearchPosts} />
            <PostsList items={items} showPost={showPost} />
            {Boolean(items.length) && <button type='button' onClick={loadMore}>Load more</button>}
            {error && <p>Something went wrong. Tray again later.</p>}
            {loading && <p>Loading...</p>}
            {showModal && <Modal close={closeModal}><PostDetails {...postDetails} /></Modal>}
        </>
    ) 
}

export default PostsSearch;

// class PostsSearch extends Component {
//     state = {
//         search: "",
//         items: [],
//         loading: false,
//         error: null,
//         page: 1,
//         showModal: false,
//         postDetails: null,
//     }

//     componentDidUpdate(prevProps, prevState) {
//         const {search, page} = this.state;
//         if(prevState.search !== search || prevState.page !== page) {
//             this.fetchPosts();
//         }
//     }

//     async fetchPosts() {
//         try {
//             this.setState({loading: true});
//             const {search, page} = this.state;
//             const data = await searchPosts(search, page);
//             this.setState(({items}) => ({
//                 items: [...items, ...data]
//             }))
//         }
//         catch(error) {
//             this.setState({error: error.message})
//         }
//         finally {
//             this.setState({loading: false})
//         }
//     }

//     searchPosts = ({search}) => {
//         this.setState({search, items: [], page: 1});
//     }

//     loadMore = () => {
//         this.setState(({page}) => ({page: page + 1}))
//     }

//     showPost = ({title, body}) => {
//         this.setState({
//             postDetails: {
//                 title,
//                 body,
//             },
//             showModal: true,
//         })
//     }

//     closeModal = () => {
//         this.setState({
//             postDetails: null,
//             showModal: false,
//         })
//     }

//     render () {
//         const {items, loading, error, showModal, postDetails, } = this.state;
//         const {searchPosts, loadMore, showPost, closeModal} = this;

//         return (
//             <>
//                 <PostsSearchForm onSubmit={searchPosts} />
//                 <PostsList items={items} showPost={showPost} />
//                 {/* {(!items.length && search && !loading) && <p>Posts not found</p>} */}
//                 {error && <p>Something went wrong. Tray again later.</p>}
//                 {loading && <p>Loading...</p>}
//                 {Boolean(items.length) && <button type='button' onClick={loadMore}>Load more</button>}
//                 {showModal && <Modal close={closeModal}>
//                                 <PostDetails {...postDetails} />
//                               </Modal>}
//             </>
//         ) 
//     }
// }

