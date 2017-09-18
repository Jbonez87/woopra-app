import React, { Component } from 'react';
import SearchResult from './SearchResult';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      filter: {
        title: '',
        currentPage: 0,
      },
      photos: [],
      buttonTypes: ['Go', 'All Photos', 'Clear'],
    }
    this.makePhotos = this.makePhotos.bind(this);
    this.getAllPhotos = this.getAllPhotos.bind(this);
    this.getPhotoByTitle = this.getPhotoByTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearPhotos = this.clearPhotos.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    // console.log(e.target.value);
    this.setState({
      filter: {
        [e.target.name]: e.target.value,
      }
    });
    console.log(this.state.filter.title);
  }
  getPhotoByTitle() {
    fetch(`http://localhost:3001/api/photos?page=${this.state.filter.currentPage}?title:${this.state.filter.title}`)
    .then(res => {
      return res.json()
    })
    .then(photos => {
      this.setState({
        photos: photos.results,
      })
    })
    .then(() => {
      this.makePhotos(this.state.photos);
    })
  }
  clearPhotos() {
    this.setState({
      photos: [],
    });
  }
  getAllPhotos() {
    fetch(`http://localhost:3001/api/photos?page=${this.state.filter.currentPage}`)
    .then(res => {
      return res.json()
    })
    .then(photos => {
      this.setState({
        photos: photos.results,
      })
    })
    .then(() => {
      this.makePhotos(this.state.photos);
    })
  }
  makePhotos(photos) {
    return photos.map(photo => {
      return (
        <div key={photo._id}>
          <h2>{photo.title.toUpperCase()}</h2>
          <p>{photo.id}</p>
          <img src={photo.url} alt="" />
        </div>
      );
    })
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-4 col-centered">
            <form className="input-group" onSubmit={this.getPhotoByTitle}>
              <input
                type="text"
                name="title"
                className="form-control"
                value={this.state.filter.title}
                onChange={this.handleChange}
                placeholder="Search for..."
              />
                <span className="input-group-btn">
                  <button
                    className="btn btn-outline-success"
                    type="button"
                    onClick={this.getPhotoByTitle}
                  >
                    Go
                  </button>
                </span>
                <span className="input-group-btn">
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={this.getAllPhotos}
                  >
                    All Photos
                  </button>
                </span>
                <span className="input-group-btn">
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={this.clearPhotos}
                  >
                    Clear
                  </button>
                </span>
            </form>
        </div>
        <SearchResult
          photos={this.state.photos}
          makePhotos={this.makePhotos}
        />
      </div>
    );
  }
}

export default SearchForm;
