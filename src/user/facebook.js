import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class Facebook extends Component {
constructor(props) {
super(props);
  this.state = {
    fbClicked : false
  }
}

  responseFacebook = response =>{
    console.log("fb response",response);
    this.props.updateState(response.name,response.email,response.userID,true,response.picture.data.url);
  }

  componentClicked = () => console.log("clicked");

  facebookLogin = () => {
    this.setState({
      fbClicked : true
    })
  }

  render() {
    let fbContent; 
    if(this.state.fbClicked === true)
    {
      fbContent = <FacebookLogin
                    appId="540991439628672"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />;
    } else {

      fbContent = 'LOGIN WITH FACEBOOK';
    }
    return (
     <div className="button-facebook" onClick={this.facebookLogin}>
      <i className="fa fa-facebook"></i> {fbContent}
     </div>
    );
  }
}

export default Facebook;
