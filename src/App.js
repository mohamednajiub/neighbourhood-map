import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Map from './components/Map';

class App extends Component {
  state = { userLocation: { lat: 0, lng: 0 }, loading: true };
  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }
  render() {
    const { loading, userLocation } = this.state;
    if (loading) {
      return null;
    }
    return (
      <div className = "container" >
        <Header/>
        <Menu />
        <Map lat={userLocation.lat} lng={userLocation.lng} zoom={15}/>
      </div>
    );
  }
}


export default App;