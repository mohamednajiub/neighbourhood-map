import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Menu />
      </div>
    );
  }
}

export default App;