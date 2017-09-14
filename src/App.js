import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
    }
    this.makePhotos = this.makePhotos.bind(this);
  }
  componentDidMount() {
    fetch('http://localhost:3001/api/photos')
    .then(res => {
      return res.json()
    })
    .then(photos => {
      // console.log(photos);
      this.setState({
        photos: photos,
      })
    })
  }
  makePhotos(photos) {
    Object.keys(photos).map((key) => {
      const photo = photos[key];
      return Object.keys(photo).map((idx) => {
        const photoItem = photo[idx];
        // console.log(photoItem);
        return (
          <div>
            <h2>{photoItem.title}</h2>
          </div>
        );
      })
    })
  }
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Welcome to Woopra search!</h1>
        </div>
        <div className="row">
          <div className="col-lg-4 col-centered">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..." />
                <span className="input-group-btn">
                  <button className="btn btn-success" type="button">Go!</button>
                </span>
            </div>
          </div>
        </div>
        <div className="black">
          {this.makePhotos(this.state.photos)}
          {/* {console.log(this.state.photos)} */}
        </div>
      </div>
    );
  }
}

export default App;
