import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../Sidebar/Sidebar';
import { IconContext } from 'react-icons';
import Logo from '../../Logo/Logo-SB.png';
import "./Navbar.css";
import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


export default function Navbar() {

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState((prevState) => ({ ...prevState, left: open }));

    };

    return (
        <>
            <IconContext.Provider value={{ color: 'white' }}>
                <div className="navbar">
                    <Link className="menu-bars">
                        <FaIcons.FaBars onClick={toggleDrawer(true)}/>
                            <SwipeableDrawer
                            className='swipable-drawer'
                                anchor='left'
                                open={state['left']}
                                onClose={toggleDrawer(false)}
                                onOpen={toggleDrawer(true)}
                            >
                                {<Sidebar />}
                            </SwipeableDrawer>
                    </Link>

                    <div className="navbar-center">
                        <a href="./" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <img src={Logo} alt="Coffe Shop Logo" className="navbar-logo" />
                            <span className="navbar-title">The Coffe Shop</span>
                        </a>

                    </div>

                    <div className='menu-account'>
                        <a href="./account">
                            <FaIcons.FaRegUserCircle />
                        </a>
                    </div>
                </div>
            </IconContext.Provider>
        </>
    );
}
