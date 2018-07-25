import React, {Component} from 'react';
import axios from 'axios';
import {baseUrl} from './../helpers/envHelper';
import Facebook from './facebook';
import Message from './../include/Message';
import { Link } from 'react-router-dom'
import './LoginForm.css';

//socket code
import { socketConnect } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(baseUrl);

export default class LoginForm extends Component {
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
				new Promise((resolve,reject) => {
						var self = this;
						const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/login',{
								userName: self.state.userName,
								userEmail: self.state.userEmail,
								userPassword: self.state.userPassword,
								socialMediaAuth: self.state.socialMediaAuth,
								userProfilePath : self.state.userProfilePath
							})
						.then((response)=> {
							console.log("response",response.data.data[0])
							if(response.data.error===false)
							{
								self.setState({
									errorMessage : '',
									successMessage : response.data.message
								});

								if(response.data.data[0].socialMediaAuth === true)
								{

									localStorage.setItem('token',response.data.data[0].userToken);
									axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
									localStorage.setItem('user-id',response.data.data[0].id);
									localStorage.setItem('user-name',response.data.data[0].userName);
									localStorage.setItem('user-unqId',response.data.data[0].userUniqueID);
									socket.emit('userConnected', { unq_id: localStorage.getItem('user-unqId') });		
								        new Promise((resolve,reject) => {
								                    const instance = axios.create({
													  timeout: 1000,
														  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
													});
													instance.post(baseUrl + '/api/user-coin',{userid : response.data.data[0].id})
								                    .then((response)=> {
								                        console.log(response.data.data[0].currentCoins);
								                        if(response.data.error === false)
								                        {
								                            localStorage.setItem('user-coin',response.data.data[0].currentCoins);
								                        }
								                        self.props.history.push('/');
								                        resolve();
								                    });                
								            });
								}
								else
								{
									localStorage.setItem('token',response.data.data[0].userToken);
									localStorage.setItem('user-id',response.data.data[0].id);
									localStorage.setItem('user-name',response.data.data[0].userName);
									localStorage.setItem('user-email',response.data.data[0].userEmail);
									localStorage.setItem('user-unqId',response.data.data[0].userUniqueID);
									if(response.data.data[0].userEmail !== 'animesh@admin.in')
									{

										socket.emit('userConnected', { unq_id: localStorage.getItem('user-unqId') });		

								        new Promise((resolve,reject) => {
								                     const instance = axios.create({
													  timeout: 1000,
														  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
													});
													instance.post(baseUrl + '/api/user-coin',{userid : response.data.data[0].id})
								                    .then((response)=> {
								                        console.log(response.data.data[0].currentCoins);
								                        if(response.data.error === false)
								                        {
								                            localStorage.setItem('user-coin',response.data.data[0].currentCoins);
								                        }
								                        self.props.history.push('/');
								                        resolve();
								                    });                
								            });
							    	}
							    	else {
							    		self.props.history.push('/admin/dashboard');
							    	}
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

validate_login = (event) => {
		event.preventDefault();
		
		var Reg_Email = document.getElementById('Reg_Email');
		var Reg_Email_msg = document.getElementById('Reg_Email_msg');

		var Reg_Password = document.getElementById('Reg_Password');
		var Reg_Password_msg = document.getElementById('Reg_Password_msg');


		//Email
		if(Reg_Email.value==="")
		{
			Reg_Email.focus();
			Reg_Email_msg.style.display="block";
			Reg_Email_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please Enter your Email ID";
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
				Reg_Email_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please Enter a valid Email ID";
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
				Reg_Password_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please Enter a password";
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
				Reg_Password_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please Enter atleast six characters";
				return false;
			}
		else
			{
				Reg_Password_msg.style.display="none";
				Reg_Password_msg.innerHTML="";
			}

			this.updateState(null,event.target.userEmail.value,event.target.userPassword.value,null,null);
	}

	render () {
		
		return (

			<div className= "LoginForm">
				<div className="heading">
					<h2>Login</h2>
				</div>
				<div className="container">
					<div className="mainbox">
						<Message message={this.state}/>
						<div className="row">
							<div className="col-md-7">
								<form method="post" onSubmit={this.validate_login}>
									<div className="LoginFormShow ">
										<div className="input-group-prepend">
	        								<div className="input-group">
	         									<div className="input-group-text"><i className="fa fa-envelope "></i></div>
	        									<input type="text" className="form-control" id="Reg_Email" name="userEmail" placeholder="Your email"/>
	      									</div>
										</div>
										<label className="control-label" id="Reg_Email_msg"></label>
										<div className="input-group-prepend">
	        								<div className="input-group">
	         									<div className="input-group-text"><i className="fa fa-lock "></i></div>
	        									<input type="password" className="form-control" id="Reg_Password" name="userPassword" placeholder="Your password"/>
	      									</div>
										</div>
										<label className="control-label" id="Reg_Password_msg"></label>
										<div className="input-group-prepend">
	        								<div className="input-group">
	         									<button type="submit" className="btn btn-primary btn-lg" id="sbmt-btn">Login</button>
										</div>
										</div>
	    								<div className="login_footer">
											<ul>
												<li>Not a member? <Link to="/signup">Sign Up</Link></li>
												<li><Link to="/forget">Forgot Password?</Link></li>
											</ul>
										</div>
									</div>
								</form>
							</div>
									
							
						
							<div className="col-md-5">
								<div className="wrap-button ">
									<Facebook updateState={this.updateState}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
	

		);
	}
}