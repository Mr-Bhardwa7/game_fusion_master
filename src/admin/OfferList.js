import React, {Component} from 'react';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios'
import Message from './../include/Message';
import './OfferList.css';
import coins from './../assets/images/coins.svg';
import Sidebar from './AdminSidebar';


export default class OfferList extends Component{
constructor(props)
{
	super(props);
	this.state = {
		data : [],
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
						instance.post(baseUrl + '/api/offer-details')
						.then((response)=> {
							console.log(response.data.data);
							if(response.data.error === false)
							{
								self.setState({
									data : response.data.data
								});
							}
							else {
								self.props.history.push('/login');
							}
							resolve();
						})
							.catch(function (error) {
							  console.log(error);
							 });

						
						
				});
		}


	offerDelete = (event) => {
		var self = this;
		var id = event.target.id;
		new Promise((resolve,reject) => {
						const instance = axios.create({
							  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/offer-delete', {id : id})
						.then((response)=> {
							console.log(response.data.data);
							if(response.data.error === false)
							{
								
								self.props.history.push('/admin/offer-details')
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
	

	render() {
		var offersList;
		if(this.state.data == "")
		{
			offersList = <tr>
							<td colspan='8' >no records found</td>
						 </tr>;
		} else 
		{
		offersList = this.state.data.map((title,index) => {
			var d = new Date(title.endDate);
			var s = new Date(title.startDate);
			var startDate = `${s.getDate()}-${s.getMonth()+1}-${s.getFullYear()}`;
			var endDate = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
			var today = new Date();
			var sDate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
			var status;
			if(startDate > sDate) { status = 'upcomming';}
			else if(startDate <= sDate && endDate >= sDate) { status = 'ongoing';}
			else if(endDate < sDate) { status = 'expired';}
			var times;
			if(status !=='ongoing'){times = <i className="fa fa-times" id={title.id} onClick={this.offerDelete}></i>;}
			return <tr>
						<td> {(index)+1} </td>
						<td> #{title.id} </td>
						<td> <img src={coins} alt="" className="coins"/> {title.offerCoin} </td>
						<td> Rs. {title.offerValue} </td>
						<td>{startDate}</td>
						<td>{endDate}</td>						
						<td>{status}</td>
						<td>{times}</td>
					</tr>;
		});
	}

		return (

			<div className="adminPanel">
				<div className="heading"> <h2> Offer Details </h2></div>
				<div className="container">
					<div className="mainbox">
					<Message message={this.state}/>
						<div className="row">
							<div className="col-md-3">
								<div className="adminService">
									<Sidebar />
								</div>
							</div>
							<div className="col-md-9">
								<div className="dashboard">
									<table className="table table-hover table-bordered table-striped tab" cellspacing="0" width="100%">
										<thead>	
											<tr>
												<th>S.No</th>
												<th>Offer Id</th>
												<th>Coins</th>												
												<th>Offer Price</th>
												<th>Start Date</th>
												<th>End Date</th>
												<th>Status</th>
												<th>Delete</th>
											</tr>
										</thead>
										<tbody>
											{offersList}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}
}