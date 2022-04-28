import { Fragment } from "react/cjs/react.production.min"
import classes from './Header.module.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';

// import Login from './../auth/login';
// import { propTypes } from "react-bootstrap/esm/Image";

const Header = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const { isAuthenticated, isLoading } = useAuth0();
    // const loggedIn = () => {
        
    //     return (
    //         isAuthenticated ? setIsLoggedIn(true) : setIsLoggedIn(false)
    //     )
        
    // }
    const LogoutButton = () => {
        const { logout, user } = useAuth0();
      
        return (
            <div className={classes.login} >
                <Button className={classes.button}  onClick={() => logout({ returnTo: window.location.origin })}>
                <img className={classes.image} src={user.picture}></img>
                    Log Out
                </Button>
            </div>
            
        )
    };
    
    const LoginButton = () => {
        const { loginWithRedirect } = useAuth0();
        
        return(
            <div className={classes.login}>
                <Button className={classes.button} onClick={() => loginWithRedirect()}>
                <img className={classes.image} src="user.png"></img>
                    Log In
                </Button>
            </div>
        )
        // () => loginWithRedirect()

    };
    
    return (
        <Fragment>
            <header className={classes.header}>
            <a href="/"><img src="logo.png" width="100px" height="100px" alt='Logo of house and a university cap'></img>
                <div>
                    <h3>The Student Guide</h3>
                    <h3>to Moving Out</h3>
                </div>
            </a>
            <div className={classes.title}>
                {props.Title}
            </div>
            <div className={classes.div}>
                <Navbar collapseOnSelect expand="lg" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className={classes.sidebar} id="responsive-navbar-nav">
                    <Nav className="bold">
                        <Nav.Link className={classes.navbar} href='/budget-calculator'>Budget Calculator</Nav.Link>
                        <Nav.Link className={classes.navbar} href='/meal-planner'>Meal Planner</Nav.Link>
                        <Nav.Link className={classes.navbar} href='/expense-comparison'>Bill Comparison</Nav.Link>
                        <Nav.Link className={classes.navbar} href='/blog'>Blog</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
            <div className={classes.topcorner}>
            {isAuthenticated ?
                <LogoutButton />
                : isLoading ?
                    <h3>Loading ..</h3>
                :
                <LoginButton />
                }
            </div>
            </header>
        </Fragment>
    );
};

export default Header;