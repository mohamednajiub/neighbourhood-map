import React, { Component } from 'react';
import '../App.css'

class Menu extends Component {
    render() {
        return (
            <aside>
                <div className="head">
                    <h3 className="locations">Nearest locations</h3>
                </div>
                <div className="search">
                    <label htmlFor="search">Find specific place</label>
                    <input id="search" type="search" placeholder="search" />
                </div>
                <div className="search-result">
                    <ul>
                        <li> place 1 </li>
                        <li> place 2 </li>
                        <li> place 3 </li>
                        <li> place 4 </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default Menu