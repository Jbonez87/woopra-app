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
    }
    this.makePhotos = this.makePhotos.bind(this);
  }
  componentDidMount() {
    fetch(`http://localhost:3001/api/photos?page=${this.state.filter.currentPage}`)
    .then(res => {
      return res.json()
    })
    .then(photos => {
      // console.log(photos);
      this.setState({
        photos: photos.results,
      })
    })
  }
  makePhotos(photos) {
    return photos.map(photo => {
      return (
        <div key={photo._id}>
          <h2>{photo.title}</h2>
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
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search for..." />
              <span className="input-group-btn">
                <button className="btn btn-success" type="button">Go</button>
              </span>
          </div>
          <SearchResult
            photos={this.state.photos}
            makePhotos={this.makePhotos}
          />
        </div>
      </div>
    );
  }
}

export default SearchForm;
