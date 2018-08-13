import React, { Component } from 'react';
import '../App.css';

class Map extends Component {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
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
  }
  render() {
    return (
      <div id = "map" ref = "map" />
    )
  }
}

export default Map