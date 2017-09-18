import React, { Component } from 'react';
import SearchResult from './SearchResult';
import InfiniteScroll from 'react-infinite-scroller';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      page: 0,
      photos: [],
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
      [e.target.name]: e.target.value,
    });
    // console.log(this.state.filter.title);
  }
  // searchByParam(e, param) {
  //   e.preventDefault();
  //   fetch(`http://localhost:3001/api/photos?${param}=${e.target.value}`)
  //   .then(res => {
  //     return res.json()
  //   })
  //   .then(photos => {
  //     this.setState({
  //       photos: photos.results,
  //     })
  //   })
  // }
  getPhotoByTitle() {
      fetch(`http://localhost:3001/api/photos?title=${this.state.title}`)
      .then(res => {
        return res.json()
      })
      .then(photos => {
        this.setState({
          photos: photos.results,
        })
      })
      // .then(() => {
      //   this.makePhotos(this.state.photos);
      // })
  }
  clearPhotos() {
    this.setState({
      photos: [],
      title: '',
    });
  }
  getAllPhotos() {
    fetch(`http://localhost:3001/api/photos?page=${this.state.page}`)
    .then(res => {
      return res.json()
    })
    .then(photos => {
      this.setState({
        photos: photos.results,
      })
    })
    // .then(() => {
    //   this.makePhotos(this.state.photos);
    // })
  }
  makePhotos(photos) {
    return photos.map(photo => {
      return (
        <div key={photo._id} className="search">
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
            <form className="input-group">
              <input
                type="text"
                name="title"
                className="form-control"
                value={this.state.title}
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
        <InfiniteScroll
          pageStart={this.state.page}
        >
          <SearchResult
            photos={this.state.photos}
            makePhotos={this.makePhotos}
          />
        </InfiniteScroll>
      </div>
    );
  }
}

export default SearchForm;


// 34674 number of pixels to 50 pictures
