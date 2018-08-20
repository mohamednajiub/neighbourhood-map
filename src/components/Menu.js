import React, { Component } from 'react';
import '../App.css'

class Menu extends Component {
    render() {
        console.log(this.props.places)
        return (
            <aside>
                <div className="head">
                    <h3 className="locations">Nearest locations</h3>
                </div>
                <div className="search">
                    <label htmlFor="search">Find specific place</label>
                    <input id="search" type="search" placeholder="search" />
                </div>
                {this.props.places.length !== 0 && (
                    <ul className="search-result">
                        {this.props.places.map((place, index) => (
                            <li 
                                key={index}
                                tabindex={index}
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