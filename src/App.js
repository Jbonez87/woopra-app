import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: []
    };
  }
  componentDidMount() {

  }
  render() {
    return (
      <div class="col-lg-6">
        <h1>Welcome to Woopra search!</h1>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search for..." />
            <span class="input-group-btn">
              <button class="btn btn-secondary" type="button">Go!</button>
            </span>
        </div>
      </div>
    );
  }
}

export default App;
