import React, {Component} from 'react';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios';
import Sidebar from './AdminSidebar';
import './OfferList.css';


export default class PaymentsDetails extends Component{
	constructor(props)
{
	super(props);
	this.state = {
		data : []
	}
}
	componentWillMount(){
			var self = this;
			new Promise((resolve,reject) => {
						const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/payment-details')
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
	render() {

		var PaymentDetails;
		if(this.state.data == "")
		{
			PaymentDetails = <tr>
							<td colspan='8' >no records found</td>
						 </tr>;
		} else 
		{
		PaymentDetails = this.state.data.map((title,index) => {
			return <tr>
						<td> {(index)+1} </td>
						<td> {title.user.userName} </td>
						<td> #{title.offer.id} </td>
						<td> {title.paymentId} </td>
						<td>PAID</td>
					</tr>;
			});
		}

		return (

			<div className="adminPanel">
				<div className="heading"> <h2> Payments Details</h2></div>
				<div className="container">
					<div className="mainbox">
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
												<th> User Name</th>
												<th> Order-Id </th>
												<th> Payment-Id</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>

											{PaymentDetails}
											
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