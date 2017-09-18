import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/search.css';

class SearchResult extends Component {
  render() {
    return (
      <div className="container">
        {this.props.makePhotos(this.props.photos)}
      </div>
    );
  }
}

SearchResult.propTypes = {
  photos: PropTypes.array,
  makePhotos: PropTypes.func,
};

export default SearchResult;
