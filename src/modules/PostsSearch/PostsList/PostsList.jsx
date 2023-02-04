import PropTypes from 'prop-types';

import styles from './posts-list.module.scss';

const PostsList = ({items, showPost}) => {
    const elements = items.map(({id, title, body}) => <li onClick={() => showPost({title, body})} key={id} className={styles.item}>
                                                            <h4>{title}</h4>
                                                            <p>{body}</p>
                                                        </li>)

    return(
        <ul className={styles.list}>
            {elements}
        </ul>
    )
}

export default PostsList;

PostsList.defaultProps = {
    items: []
}

PostsList.propTypes = {
    showPost: PropTypes.func.isRequired,
}