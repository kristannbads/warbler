import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../images/warbler-logo.png";
import { logout } from '../store/actions/auth';

class Navbar extends Component {
    render() {
        const userLogout = (e) => {
            e.preventDefault();
            this.props.logout()
        }
        return (
            <nav className='navbar navbar-expand'>
                <div className='container-fluid'>
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">
                            <img src={Logo} alt="Warbler Home" />
                        </Link>
                    </div>
                    {this.props.currentUser.isAuthenticated ? (
                        <ul className='nav navbar-nav navbar-right'>
                            <li>
                                <Link to={`/user/${this.props.currentUser.user.id}/messages/new`}> New Message</Link>
                            </li>
                            <li>
                                <a onClick={userLogout}> Logout</a>
                            </li>
                        </ul>) :
                        <ul className='nav navbar-nav navbar-right'>
                            <li>
                                <Link to='/signup'> Sign up</Link>
                            </li>
                            <li>
                                <Link to='/signin'> Sign in</Link>
                            </li>
                        </ul>
                    }



                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, { logout })(Navbar)