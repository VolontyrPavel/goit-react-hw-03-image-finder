import PropTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
  onHandleModal = ({ code }) => {
    if (code === 'Escape') {
      this.props.modalControl();
    }
  };

  componentDidMount = () => {
    document.addEventListener('keydown', this.onHandleModal);
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.onHandleModal);
  };

  onBackdropClose = e => {
    if (e.currentTarget === e.target) {
      this.props.modalControl();
    }
  };

  render() {
    return (
      <div className="overlay" onClick={this.onBackdropClose}>
        <div className="modal">
          <img src={this.props.imagesURL} alt="" width="800" height="600" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imagesURL: PropTypes.string.isRequired,
  modalControl: PropTypes.func.isRequired,
}