import { Component } from 'react';

import * as SearchService from '../service/search-service';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    isEmpty: false,
    loadMore: false,
    modal: false,
    imageURL: '',
  };

  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getSearch(query, page);
    }
  };

  getSearch = async (query, page) => {
    if (!query) {
      return;
    }

    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await SearchService.getFound(query, page);

      if (hits.length === 0) {
        this.setState({ isEmpty: true });
      }

      const newHits = [];
      for (const hit of hits) {
        const id = hit.id;
        const webformatURL = hit.webformatURL;
        const largeImageURL = hit.largeImageURL;
        const object = { id, webformatURL, largeImageURL };
        newHits.push(object);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...newHits],
        loadMore: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onHandleSubmit = value => {
    this.setState({ query: value, images:[], page:1 });
  };

  modalControl = imageURL => {
    this.setState(prevState => ({ modal: !prevState.modal, imageURL }));
  };

  onloadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loadMore, modal, isLoading, imageURL } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.onHandleSubmit} />
        <ImageGallery>
          <ImageGalleryItem images={images} modalControl={this.modalControl} />
        </ImageGallery>
        {loadMore && <Button onloadMore={this.onloadMore}></Button>}
        {modal && (
          <Modal imagesURL={imageURL} modalControl={this.modalControl}></Modal>
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}
