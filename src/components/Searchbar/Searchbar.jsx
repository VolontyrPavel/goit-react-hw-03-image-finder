import PropTypes from 'prop-types';
import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInput = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = e => {
        const { query } = this.state;
        e.preventDefault();
        if (!query) {
          return alert('Заповніть строку пошуку')
        }
        this.props.onSubmit(this.state);
        this.reset();
      };

  reset = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <header className="searchbar">
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.handleInput}
            className="input"
            name="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
