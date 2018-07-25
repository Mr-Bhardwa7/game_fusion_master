import React, {Component} from 'react';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios';
import { Link} from 'react-router-dom';
import Message from './../include/Message';
import Facebook from './facebook';
import './Registration.css';


export default class RegisForm extends Component {
constructor(props)
{	super(props);
	this.state = {
		userName : this.props.userName,
		userEmail : this.props.userEmail,
		userPassword : this.props.userPassword,
		socialMediaAuth : this.props.socialMediaAuth,
		userProfilePath : this.props.userProfilePath,
		errorMessage : '',
		successMessage : ''
	}
}

updateState = (userName,userEmail,userPassword,socialMediaAuth,userProfilePath) => {
	this.setState({
		userName : userName,
		userEmail : userEmail,
		userPassword : userPassword,
		socialMediaAuth : socialMediaAuth,
		userProfilePath : userProfilePath
	}, () => {
		var self = this;
		new Promise((resolve,reject) => {
						const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/signup',{
							userName: self.state.userName,
							userEmail: self.state.userEmail,
							userPassword: self.state.userPassword,
							socialMediaAuth: self.state.socialMediaAuth,
							userProfilePath : self.state.userProfilePath
						})
						.then((response)=> {
							if(response.data.error===false)
							{	
								self.setState({
									errorMessage : '',
									successMessage : response.data.message
								});

								if(response.data.data.socialMediaAuth === true)
								{
									localStorage.setItem('token',response.data.data.userToken);
									axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
									self.props.history.push('/');
								}
								else
								{	
									self.props.history.push('/login');
								}
							} else {

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
	});
}

	validate_registration = (event) => {
		event.preventDefault();
		
		var Reg_Name = document.getElementById('Reg_Name');
		var Reg_Name_msg = document.getElementById('Reg_Name_msg');

		var Reg_Email = document.getElementById('Reg_Email');
		var Reg_Email_msg = document.getElementById('Reg_Email_msg');

		var Reg_Password = document.getElementById('Reg_Password');
		var Reg_Password_msg = document.getElementById('Reg_Password_msg');

		//Name
		if(Reg_Name.value==="")
		{
			Reg_Name_msg.style.display="block";
			Reg_Name_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter your name";
			Reg_Name.focus();
			return false;
		}
		else
		{
			Reg_Name_msg.style.display="none";
			Reg_Name_msg.innerHTML="";
		}
		var names = /^[a-zA-Z ]+$/;
		if(!Reg_Name.value.match(names))
			{
				Reg_Name_msg.style.display="block";
				Reg_Name_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter characters only";
				Reg_Name.focus();
				return false;
			}
		else
			{
				Reg_Name_msg.style.display="none";
				Reg_Name_msg.innerHTML="";
			}

		//Email
		if(Reg_Email.value==="")
		{
			Reg_Email.focus();
			Reg_Email_msg.style.display="block";
			Reg_Email_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter your email id";
			return false;
		}
		else
			{
				Reg_Email_msg.style.display="none";
				Reg_Email_msg.innerHTML="";
			}
		
		var email_reqd = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
		if(!Reg_Email.value.match(email_reqd))
			{
				Reg_Email.focus();
				Reg_Email_msg.style.display="block";
				Reg_Email_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter a valid email id";
				return false;
			}
		else
			{
				Reg_Email_msg.style.display="none";
				Reg_Email_msg.innerHTML="";
			}


		//Password
		if(Reg_Password.value==="")
			{
				Reg_Password.focus();
				Reg_Password_msg.style.display="block";
				Reg_Password_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter a password";
				return false;
			}
		else
			{
				Reg_Password_msg.style.display="none";
				Reg_Password_msg.innerHTML="";
			}
		if(Reg_Password.value.length<6)
			{
				Reg_Password.focus();
				Reg_Password_msg.style.display="block";
				Reg_Password_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter atleast six characters";
				return false;
			}
		else
			{
				Reg_Password_msg.style.display="none";
				Reg_Password_msg.innerHTML="";
			}

			this.updateState(event.target.userName.value,event.target.userEmail.value,event.target.userPassword.value,event.target.socialMediaAuth.value,null);
	}


	render () {

	
		return (

			<section className= "RegForm">
				<div className="heading">
					<h2>Registration</h2>
				</div>
				<div className="container">
					<div className="mainbox">
					<Message message={this.state}/>
						<div className="row">
							<div className="col-md-7">
								<form method="post" onSubmit={this.validate_registration} id="regForm">
									<div className="RegFormShow">
										<div className="input-group-prepend">
	        								<div className="input-group">
	         									<div className="input-group-text"><i className="fa fa-user"></i></div>
	        									<input type="text" className="form-control" id="Reg_Name" name="userName" placeholder="Your name"/>
	      									</div>
										</div>
										<label className="control-label" id="Reg_Name_msg"></label>
										<div className="input-group-prepend">
	        								<div className="input-group">
	         									<div className="input-group-text"><i className="fa fa-envelope"></i></div>
	        									<input type="text" className="form-control" id="Reg_Email" name="userEmail" placeholder="Your email"/>
	      									</div>
										</div>
										<label className="control-label" id="Reg_Email_msg"></label>
										<div className="input-group-prepend">
	        								<div className="input-group">
	         									<div className="input-group-text"><i className="fa fa-lock"></i></div>
	        									<input type="password" className="form-control" id="Reg_Password" name="userPassword" placeholder="Your password"/>
	      									</div>
										</div>
										<label className="control-label" id="Reg_Password_msg"></label>
										<input type="hidden" name="socialMediaAuth" value="false"/>
										<div className="middle">
											<div className="row">
												<div className="col-md-5">
	    											<button type="submit" className="btn btn-primary btn-lg" id="reg-btn">Signup</button>
	    										</div>
	    										<div className="col-md-7">
			    									<ul className="login-link">
														<li>Already have an account? <Link to="/login">Login</Link></li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div className="col-md-5">
								<div className="wrap-button">
									<Facebook updateState={this.updateState}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			
	

		);
	}
}