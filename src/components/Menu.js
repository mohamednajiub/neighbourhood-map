import React, { Component } from 'react';
import '../App.css'

class Menu extends Component {
    openMarkerDetails = (placeName) => {
        this.props.markers.map(marker=>{
            if (placeName === marker.title){
                window.google.maps.event.trigger(marker, 'click')
            }
        })
    }
    render() {
        return (
            <aside>
                <div className="head">
                    <h3 className="locations">Nearest locations</h3>
                </div>
                <div className="search">
                    <label htmlFor="search">Find specific place</label>
                    <input id="search" type="search" placeholder="Search" />
                </div>
                {this.props.places.length !== 0 && (
                    <ul className="search-result">
                        {this.props.places.map((place, index) => (
                            <li 
                                key = {index}
                                tabIndex = {index}
                                onClick = {()=>{this.openMarkerDetails(place.venue.name)}}
                            >
                                {place.venue.name}
                            </li>
                        ))}
                    </ul>
                )}
                {this.props.places === 0 && (
                    <ul className="search-result">
                        <li className="item">No Places Found..</li>
                    </ul>
                )}
            </aside>
        )
    }
}

export default Menu