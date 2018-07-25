import React, {Component} from 'react';
import axios from 'axios';
import {baseUrl} from './../helpers/envHelper';
import Message from './../include/Message';
import './Forgetpwd.css';
import forget from './../assets/images/padlock.svg';


export default class Forgetpwd extends Component {
constructor(props)
{
	super(props);
	this.state = {
		errorMessage : '',
		successMessage : ''
	}
}

handlePassword = (event) => {
	event.preventDefault();
	var self = this;
	new Promise((resolve,reject) => {
						const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/forget-password',{
							userEmail: event.target.userEmail.value
						})
						.then((response)=> {
							if(response.data.error===false)
							{
								self.props.history.push('/login');
							}
							else {

								self.setState({
										errorMessage : response.data.message,
										successMessage : ''
									});
							}
							resolve();
						})
							.catch(function (error) {
							  console.log(error);
							 });
						
				});

}

	render () {
		return (

			<div className= "forget-pwd">
				<div className="heading">
					<h2>Forget Password</h2>
				</div>
				<div className="container">
					<div className="mainbox pannel-center">
					<Message message={this.state}/>
						<div className="row">
							<div className="col-md-12">
								<form method="post" onSubmit={this.handlePassword}>
									<div className="forget-show">
										<div className="wrapping">
											<img src={forget} alt="" />
											<h3>You can reset your password here..</h3>
											<div className="input-group-prepend">
				        						<div className="input-group center">
				         							<div className="input-group-text"><i className="fa fa-envelope "></i></div>
				        							<input type="text" className="form-control" id="user-email" name="userEmail" placeholder="Email address"/>
				      							</div>
											</div>
											<button type="submit" className="btn btn-primary btn-lg" id="forget-btn">Reset Password</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
						
				</div>
			</div>
			
	
		);
	}
}