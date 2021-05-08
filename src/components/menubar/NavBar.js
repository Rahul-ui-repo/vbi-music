import React from 'react';
import './_navbar.scss';
import './../Assets/_css.scss';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuActiveButton: 'allsongs'
        }
    }

    componentDidMount() {
        document.getElementById("allsongs").click();
    }

    changeActiveButton = (val) => {
        this.setState({ menuActiveButton: val })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-fixed-top navbar-light navsection" style={{ backgroundColor: "#1de4d7" }}>
                <span className="navbar-brand">
                    <i className="fa fa-play" style={{ color: "#5d5482" }}></i> <span className="brand-name">VBI</span> Music
                </span>
                <Link to={{ pathname: '/playlists' }}>
                    <span className={classnames("menubuttons", this.state.menuActiveButton === 'playlists' ? 'menubuttons-active' : null)} id="playlists" onClick={() => { this.changeActiveButton("playlists") }}>Playlists</span>
                </Link>
                <Link to={{ pathname: '/allsongs' }}>
                    <span className={classnames("menubuttons", this.state.menuActiveButton === 'allsongs' ? 'menubuttons-active' : null)} id="allsongs" onClick={(event) => { this.changeActiveButton("allsongs") }}>All Songs</span>
                </Link>
            </nav>
        )
    }
}

export default NavBar;