import {Component} from 'react';
 
import Modal from '../../shared/components/Modal'
import PostsSearchForm from './PostsSearchForm';
import PostsList from './PostsList';
import PostDetails from './PostDetails';

import {searchPosts} from '../../shared/services/posts-api';

import styles from './posts-search.module.scss';


class PostsSearch extends Component {
    state = {
        search: "",
        items: [],
        loading: false,
        error: null,
        page: 1,
        showModal: false,
        postDetails: null,
    }

    componentDidUpdate(prevProps, prevState) {
        const {search, page} = this.state;
        if(prevState.search !== search || prevState.page !== page) {
            this.fetchPosts();
            
            // this.setState({loading: true});
            // searchPosts(search, page)
            //     .then(data => this.setState(({items}) => ({
            //         items: [...items, ...data]
            //     })))
            //     .catch(error => this.setState({error: error.message}))
            //     .finally(() => this.setState({loading: false}))
        }
    }

    async fetchPosts() {
        try {
            this.setState({loading: true});
            const {search, page} = this.state;
            const data = await searchPosts(search, page);
            this.setState(({items}) => ({
                items: [...items, ...data]
            }))
        }
        catch(error) {
            this.setState({error: error.message})
        }
        finally {
            this.setState({loading: false})
        }
    }

    searchPosts = ({search}) => {
        this.setState({search, items: [], page: 1});
    }

    loadMore = () => {
        this.setState(({page}) => ({page: page + 1}))
    }

    showPost = ({title, body}) => {
        this.setState({
            postDetails: {
                title,
                body,
            },
            showModal: true,
        })
    }

    closeModal = () => {
        this.setState({
            postDetails: null,
            showModal: false,
        })
    }

    render () {
        const {items, loading, error, showModal, postDetails, } = this.state;
        const {searchPosts, loadMore, showPost, closeModal} = this;

        return (
            <>
                <PostsSearchForm onSubmit={searchPosts} />
                <PostsList items={items} showPost={showPost} />
                {/* {(!items.length && search && !loading) && <p>Posts not found</p>} */}
                {error && <p>Something went wrong. Tray again later.</p>}
                {loading && <p>Loading...</p>}
                {Boolean(items.length) && <button type='button' onClick={loadMore}>Load more</button>}
                {showModal && <Modal close={closeModal}>
                                <PostDetails {...postDetails} />
                              </Modal>}
            </>
        ) 
    }
}

export default PostsSearch;




// componentDidMount() {
    // this.setState({loading: true});
    // console.log('loading: ', this.state.loading);
    // axios.get("https://jsonplaceholder.typicode.com/posts")
    //     .then(({data}) => {
    //         this.setState({items: data});
    //     })
    //     .catch(error => {
    //         this.setState({error: error.message});
    //     })
