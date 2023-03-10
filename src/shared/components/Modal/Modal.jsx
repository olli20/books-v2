import {Component} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.scss';

const modalRoot = document.querySelector('#root-modal');

class Modal extends Component {

    componentDidMount() {
        document.addEventListener("keydown", this.closeModal);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.closeModal);
    }

    closeModal = ({target, currentTarget, code}) => {
        if(target === currentTarget || code === "Escape") {
            this.props.close();
        }
    }

    render() {
        const {children, close} = this.props;
        const {closeModal} = this;
        return (
            createPortal(
                <div onClick={closeModal} className={styles.overlay}>
                    <div className={styles.modal}>
                        <span className={styles.close} onClick={close}>X</span>
                        {children}
                    </div>
                </div>,
                modalRoot
            )
        )
    }
}

export default Modal;

Modal.propTypes = {
    close: PropTypes.func.isRequired,
}