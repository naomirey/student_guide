import { Fragment } from "react/cjs/react.production.min"
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
// import { NavDropdown } from 'react-bootstrap';
// import Login from './../auth/login';
// import { propTypes } from "react-bootstrap/esm/Image";

const Header = () => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Student's Guide to Moving Out</h1>
                <nav>
                    <ul>
                        <li>
                            <NavLink activeClassName={classes.active} to="/welcome">Home</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to='/budget-calculator'>Budget Calculator</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to='/meal-planner'>Meal Planner</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to='/expense-comparison'>Bill Comparison</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to='/blog'>Blog</NavLink>
                        </li>
                    </ul>
                </nav>
                {/* <Login onClick={propTypes.onShowLogin}/> */}
            </header>
        </Fragment>
    );
};

export default Header;