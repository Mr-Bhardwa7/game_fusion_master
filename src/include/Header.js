import React, {Component} from 'react';
import './Header.css';
import coins from './../assets/images/coins.svg';
import profile from './../assets/images/user.png';
import { Link } from 'react-router-dom';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios';

//socket code
import { socketConnect } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(baseUrl);

class Header extends Component {
    constructor(props){
        super(props);
    }
     

    logout = () => {
        socket.emit('userdisconnect', { unq_id: localStorage.getItem('user-unqId') });
        localStorage.clear();
        window.location = '/'
    }

	render() {
        var coinsOption,userLogin,dashboard;
        let path = window.location.href;
        var pathIndex = path.split('/');
        if (pathIndex[3]==='admin') {
            coinsOption = " ";
        } else {

            if(localStorage.getItem('user-coin') && localStorage.getItem('user-coin') !== "")
            {
                coinsOption = <li className="nav-item active  mr-3">
                                <span className="nav-link"><img src={coins} alt="coins" className="coins"/> { localStorage.getItem('user-coin') }
                                  {' '} <Link to="/coin-offer"><button type="button" className="btn btn-primary">
                                    <i className="fa fa-plus"></i>
                                </button></Link> <span className="sr-only">(current)</span>
                                </span>
                            </li>;
            }
            if(localStorage.getItem('user-email') && localStorage.getItem('user-email') === "animesh@admin.in")
            {
                dashboard = <li className="nav-item active  mr-3">
                                <span className="nav-link">Dashboard
                                  {' '} <Link to="/admin/dashboard"><button type="button" className="btn btn-primary">
                                    <i className="fa fa-arrow-right"></i>
                                </button></Link> <span className="sr-only">(current)</span>
                                </span>
                            </li>;
            }
        }

        if(localStorage.getItem('user-id') && localStorage.getItem('user-id') !== "")
        {
            var name = localStorage.getItem('user-name');
            if(localStorage.getItem('user-email') && localStorage.getItem('user-email') === "animesh@admin.in")
            {
                userLogin = <li className="nav-item active  mr-3">
                                <span className="nav-link">
                                <img src={profile} alt="profile" className="profileIcon"/> { name }
                                  {' '}  <button type="button" className="btn btn-danger" title="logout" onClick={this.logout}>
                                    <i className="fa fa-sign-out"></i>
                                </button><span className="sr-only">(current)</span>
                                </span>
                            </li>;
            } else 
            {
            userLogin = <li className="nav-item active  mr-3">
                                <span className="nav-link">
                                <Link to="/user"><img src={profile} alt="profile" className="profileIcon"/> { name } 
                                </Link>
                                  {' '}  <button type="button" className="btn btn-danger" title="logout" onClick={this.logout}>
                                    <i className="fa fa-sign-out"></i>
                                </button><span className="sr-only">(current)</span>
                                </span>
                            </li>;
                        }

        } else {
            userLogin =   <li>
                                <Link to="/login">
                                    <button type="button" className="btn btn-primary ml-lg-5 w3ls-btn" data-toggle="modal" aria-pressed="false" data-target="#exampleModal">
                                        Login
                                    </button>
                                </Link>
                            </li>;
        }

		return(
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-gradient-secondary pt-3">

                    <Link to="/">
                    <h1>
                        <span className="navbar-brand text-white">
                            gameFusion
                            
                        </span>
                    </h1>
                    </Link>
                    <button className="navbar-toggler ml-md-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-lg-auto text-center">
                            {coinsOption}
                            {dashboard}
                           {userLogin}       
                            
                        </ul>
                    </div>

                </nav>
            </header>
			);
	}
}

export default Header;