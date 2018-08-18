import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Map from './components/Map';
import axios from 'axios'

class App extends Component {
  state = {
    userLocation: {
      lat: 0,
      lng: 0
    },
    places: [],
    loading: true
  };
  componentDidMount(props) {
    this.getUserLocation();
  }
  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        },()=>{
          this.getPlaces();
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }
  getPlaces = (query) => {
    const API = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id: 'EICI1TY1WZY3KG2BGQCIMBETKC1TBOHYD1XP5RKIDSSEQZQF',
      client_secret: 'PLBCQROLIXW3WWSOS1UK2XHCBCWQBRNBF0MB43CMUUQ4NBOT',
      query: 'food',
      near: 'egypt',
      v: '20182570'
    }

    axios.get(API + new URLSearchParams(params))
    .then(response => {
      this.setState({
        places: response.data.response.groups[0].items
      })
    })
    .catch(err => console.log('Foursquare API error: ', err))
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