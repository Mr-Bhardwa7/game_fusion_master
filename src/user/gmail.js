import React from 'react';
import { GoogleLogin , GoogleSigninButton} from 'react-google-login-component';
 
class Login extends React.Component{
 
  constructor (props, context) {
    super(props, context);
  }
 
  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    
    console.log({ googleId });
    console.log({accessToken: id_token});
    
  }
 
  render () {
    return (
      <div>
        <GoogleLogin socialId="156173318888-gnv75e35mludqfna0hodv8d9jjhhcl0c.apps.googleusercontent.com"
                     className="google-login"
                     scope="profile"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle}
                     buttonText="Login With Google"/>
      </div>
    );
  }
 
}
 
export default Login;