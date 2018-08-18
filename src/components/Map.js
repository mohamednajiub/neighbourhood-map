import React, { Component } from 'react';
import '../App.css';

class Map extends Component {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    this.loadMap()
  }
  initMap = () => {
    this.map = new window.google.maps.Map(this.refs.map, {
      center: { lat: this.props.lat, lng: this.props.lng},
      zoom: this.props.zoom
    });
    this.marker = new window.google.maps.Marker({
      map: this.map,
      position: {
        lat: this.props.lat,
        lng: this.props.lng
      }
    });
    let infowindow = new window.google.maps.InfoWindow();
  }
  loadMap = () =>{
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAgZzdo8v_0gAMHcFd_Act1gYhs9Klvc8o&callback=initMap');
    // make the init map visible to React
    window.initMap = this.initMap;
  }
  render() {
    return (
      <div id="map" ref="map" />
    )
  }
}

function loadScript(url) {
  let index = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index)
}

export default Map