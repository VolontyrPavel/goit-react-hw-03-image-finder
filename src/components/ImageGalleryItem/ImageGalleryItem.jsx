import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, modalControl }) => {
  return images.map(img => (
    <li key={img.id} onClick={()=>modalControl(img.largeImageURL)} className="imageGalleryItem">
      <img src={img.webformatURL} alt="" className="imageGalleryItemImg" />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })),
  modalControl: PropTypes.func.isRequired,
};

