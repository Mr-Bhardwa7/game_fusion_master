import React, {Component} from 'react';
import './FixedIcon.css';

class FixedIcon extends Component {

    render() {

        return(

        <div className="container">
        
            <div id="fixed-social">
                <div>
                    <a href="#" className="fixed-facebook mb-2 rounded-right" target="_blank">
                        <i className="fa fa-facebook-f"></i>
                        <span class="rounded-left">Facebook</span>
                    </a>
                </div>
                <div>
                    <a href="#" className="fixed-twitter mb-2 rounded-right" target="_blank">
                        <i className="fa fa-twitter"></i>
                        <span class="rounded-left">Twitter</span>
                    </a>
                </div>
                <div>
                    <a href="#" className="fixed-gplus mb-2 rounded-right" target="_blank">
                        <i className="fa fa-google-plus"></i>
                        <span class="rounded-left">Google+</span>
                    </a>
                </div>
                <div>
                    <a href="#" className="fixed-linkedin mb-2 rounded-right" target="_blank">
                        <i className="fa fa-linkedin"></i>
                        <span class="rounded-left">LinkedIn</span>
                    </a>
                </div>
                <div>
                    <a href="#" className="fixed-pintrest mb-2 rounded-right" target="_blank">
                        <i className="fa fa-pinterest-p"></i>
                        <span class="rounded-left">Pinterest</span>
                    </a>
                </div>
            </div>
        </div>
            );
    }
}

export default FixedIcon;