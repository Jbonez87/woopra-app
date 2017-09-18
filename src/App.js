import React from 'react';
import SearchForm from './components/SearchForm';
import './css/App.css';

const App = () => {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Welcome to Woopra search!</h1>
      </div>
      <SearchForm />
    </div>
  );
}

export default App;
