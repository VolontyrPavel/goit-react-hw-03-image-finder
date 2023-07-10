import PropTypes from 'prop-types';

export const Button = ({ onloadMore }) => {
  return <button className='button' onClick={() => onloadMore()}>Load more</button>;
};

Button.propTypes = {
  onloadMore: PropTypes.func.isRequired,
}