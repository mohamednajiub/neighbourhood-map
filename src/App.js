import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Map from './components/Map';




class App extends Component {
  
  render() {
    return ( 
      <div className = "container" >
        <Header/>
        <Menu />
        <Map lat={30.12489} lng={31.29406} zoom={15}/>
      </div>
    );
  }
}


export default App;