import React, {Component} from 'react';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Dashboard.css';
import coins from './../assets/images/coins.svg';
import Sidebar from './AdminSidebar';

export default class Admin extends Component{
constructor(props){
	super(props);
	this.state = {
		onlineUser : this.props.onlineUser,
		ongoingOffer : '',
		upcommingOffer : '',
		totalUser : '',
		errorMessage : '',
		successMessage : ''
	}

	
}

	  componentWillMount(){
		var self = this;
		new Promise((resolve,reject) => {
					const instance = axios.create({
						  timeout: 1000,
						  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
					});
					instance.post(baseUrl + '/api/dashboard').then((response)=> {
						if(response.data.error === false)
							{
								console.log(response.data.data)
								self.setState({
									ongoingOffer : response.data.data.ongoingOffer,
									upcommingOffer : response.data.data.upcommingOffer,
									totalUser : response.data.data.totalUser
								});
							}
							else {
								self.props.history.push('/login');
							}
						resolve();
					});
					
					
			});
	}

	render() {
		var onlineUser = this.state.onlineUser;
		var activeUser;
		if(onlineUser === null)
		{
			activeUser = 0;
		} else {
			activeUser = onlineUser.length;
		}
		return (

			<div className="adminPanel">
				<div className="dashboard-heading"> <h2> Admin Panel</h2></div>
				<div className="container">
					<div className="mainbox">
						<div className="row">
							<div className="col-md-3">
								<div className="adminService">
									<Sidebar {...this.state}/>
								</div>
							</div>
							
							<div className="col-md-9">
								<div className="dashboard">
									<div className="row">

										<div className="col-md-6">
											<div className="dashboardbox">
												<span className="totalcount">{activeUser}</span>
												<div className="headerdashboard">
													<label className="footerpanel"><i className="fa fa-users"></i> Active Users</label>
													</div>
												<div className="clearfix"></div>
											</div>
										</div>

										<div className="col-md-6">
											<div className="dashboardbox">
												<span className="totalcount">{this.state.ongoingOffer}</span>
												<div className="headerdashboard">
													<label className="footerpanel"><img src={coins} className="coins" alt="" /> Ongoing Offers</label>
													<Link to="/admin/offer-details">
													<span className="icon"><i className="fa fa-arrow-circle-right"></i></span>
													</Link>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
											
									</div>
									<div className="row">

										<div className="col-md-6">
											<div className="dashboardbox">
												<span className="totalcount">{this.state.upcommingOffer}</span>
												<div className="headerdashboard">
													<label className="footerpanel"><img src={coins} className="coins" alt="" /> Upcomming  Offers</label>
													<Link to="/admin/offer-details">
													<span className="icon"><i className="fa fa-arrow-circle-right"></i></span>
													</Link>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>

										<div className="col-md-6">
											<div className="dashboardbox">
												<span className="totalcount">{this.state.totalUser}</span>
												<div className="headerdashboard">
													<label className="footerpanel"><i className="fa fa-users"></i> Users</label>
													<Link to="/admin/user-details">
													<span className="icon"><i className="fa fa-arrow-circle-right"></i></span>
													</Link>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
											
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}
}