import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Map from './components/Map';

class App extends Component {
  state = { userLocation: { lat: 0, lng: 0 }, loading: true };
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
      ll: this.state.userLocation,
      query: query,
      v: '20182570'
    }

    fetch(`${API}ll=${params.ll}&Id=4bf58dd8d48988d181941735,4bf58dd8d48988d13a941735&client_id=${params.client_id}&client_secret=${params.client_secret}&v=${params.v}`)
    .then(res => {
      if(!res.ok){
        throw Error(res.statusText)
      }
      return res.json()
    })
    .then(response => console.log(response.response.groups[0]))
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