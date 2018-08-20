import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Map from './components/Map';
import axios from 'axios'

class App extends Component {
  state = {
    places: [],
  };
  componentDidMount() {
    this.getPlaces();
  }
  // insert google API script in our page
  loadMap = () =>{
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAgZzdo8v_0gAMHcFd_Act1gYhs9Klvc8o&callback=initMap');
    // make the initMap callback function visible to React
    window.initMap = this.initMap;
  }
  // get places from foursquare API 
  getPlaces = () => {
    const API = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id: 'EICI1TY1WZY3KG2BGQCIMBETKC1TBOHYD1XP5RKIDSSEQZQF',
      client_secret: 'PLBCQROLIXW3WWSOS1UK2XHCBCWQBRNBF0MB43CMUUQ4NBOT',
      query: 'food',
      near: 'Egypt',
      v: '20182570'
    }

    axios.get(API + new URLSearchParams(params))
    .then(response => {
      this.setState({
        places: response.data.response.groups[0].items
      },this.loadMap())
    })
    .catch(err => console.log('Foursquare API error: ', err))
  }
  initMap = () => {
    // create the Map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 26.810883, lng: 31.384734},
      zoom: 6
    })
    // create info window
    let infowindow = new window.google.maps.InfoWindow();
    // create marker for each place
    this.state.places.map(place=>{
      // create and show the marker
      let marker = new window.google.maps.Marker({
        position: {
          lat: place.venue.location.lat,
          lng: place.venue.location.lng
        },
        map: map,
        title: place.venue.name
      })
      // set info window content
      let content = `
        <table>
          <thead>
            <th>${place.venue.name}</th>
          </thead>
          <tbody>
            <tr>
              <td>Address:</td>
              <td>${place.venue.location.formattedAddress[0]} ${place.venue.location.formattedAddress[1]} ${place.venue.location.formattedAddress[2]}</td>
            </tr>
          </tbody>
        </table>`;
        // add content to info window by click
        marker.addListener('click', function() {
          // Update 'InfoWindow' content
          infowindow.setContent(content)
          // Open An 'InfoWindow'
          infowindow.open(map, marker)
      })
    })
  }
  
  render() {
    return (
      <div className = "container" >
        <Header/>
        <Menu places={this.state.places}/>
        <Map />
      </div>
    );
  } 
}

function loadScript(url) {
  let index = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  index.parentNode.insertBefore(script, index)
}
export default App;