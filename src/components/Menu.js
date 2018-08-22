import React, { Component } from 'react';
import '../App.css'
import escapeRegExp from 'escape-string-regexp';

class Menu extends Component {
    state = {
        places: [],
        query: ''
    }
    UpdateQuery = (query) => {
        this.setState({ query })
        
        let displayedPlaces = this.props.places
        let searchedPlaces

        if(this.state.query && (this.state.query !== '')) {
            const match = new RegExp(escapeRegExp(query), 'i');
            searchedPlaces = displayedPlaces.filter((place) => match.test(place.venue.name))
            this.setState({places: searchedPlaces})
        } else {
            this.setState({places: displayedPlaces})
        }
    }
    openMarkerDetails = (placeName) => {
        this.props.markers.map(marker => {
            if (placeName === marker.title){
                window.google.maps.event.trigger(marker, 'click')
            }
        })
    }
    
    render() {
        if (!this.state.query){
            this.state.places = this.props.places
        } 
        
        return (
            <aside>
                <div className="head">
                    <h3 className="locations">Nearest locations</h3>
                </div>
                <div className="search">
                    <label htmlFor="search">Find specific place</label>
                    <input
                        id = "search"
                        type = "search"
                        placeholder = "Search"
                        value = {this.state.query}
                        onChange = {(event)=>this.UpdateQuery(event.target.value)}
                    />
                </div>
                {this.state.places.length !== 0 && (
                    <ul className="search-result">
                        {this.state.places.map((place, index) => (
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
                
                {this.state.places === 0 && (
                    <ul className="search-result">
                        <li className="item">No Places Found..</li>
                    </ul>
                )}
            </aside>
        )
    }
}

export default Menu