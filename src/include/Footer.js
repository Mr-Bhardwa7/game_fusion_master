import React, { Component } from 'react';
import './Footer.css';



class Footer extends Component {
  render() {
    return (
      <footer className="main-footer text-center" id="footer">
        <div className="container">
          <div className="footer-bottom">
               <div className = "row">
                  <div className="col-md-6">
                      <div className="copyright-text">Copyright © 2018. All Rights Reserved By <span>Game Fusion</span></div>
                  </div>
                  <div className="col-md-6">
                      <ul className="social-links">
                          <li><a href="https://www.facebook.com/" target="_blank"><span className="fa fa-facebook-f"></span></a></li>
                          <li><a href="https://twitter.com/" target="_blank"><span className="fa fa-twitter"></span></a></li>
                          <li><a href="https://plus.google.com/" target="_blank"><span className="fa fa-google-plus"></span></a></li>
                          <li><a href="https://in.linkedin.com/" target="_blank"><span className="fa fa-linkedin"></span></a></li>
                          <li><a href="https://www.instagram.com/?hl=en" target="_blank"><span className="fa fa-instagram"></span></a></li>
                       </ul>
                  </div>
                </div>
             </div>
          </div>
        </footer>
    );
  }
}

export default Footer;
