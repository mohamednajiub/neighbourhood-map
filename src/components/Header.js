import React, { Component } from 'react';
import '../../App.css'

class Header extends Component {

    toggleMenu = () => {
        const menu = document.querySelector('aside')
        menu.classList.toggle("toggle")
    }

    render() {

        return (
            <header>
                <h1 className="page-title">Neighborhood Map</h1>
                <span className="menuIcon" onClick={this.toggleMenu}>&#9776;</span>
            </header>
        )
    }
}
export default Header;