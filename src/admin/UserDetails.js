import React, {Component} from 'react';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios'
import './OfferList.css';
import coins from './../assets/images/coins.svg';
import Sidebar from './AdminSidebar';


export default class UserDetails extends Component{
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
						instance.post(baseUrl + '/api/user-details')
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
		var UserDetails;
		if(this.state.data == "")
		{
			UserDetails = <tr>
							<td colspan='8' >no records found</td>
						 </tr>;
		} else 
		{
		UserDetails = this.state.data.map((title,index) => {
			return <tr>
						<td> {(index)+1} </td>
						<td> {title.userName} </td>
						<td> {title.userUniqueID} </td>
						<td> <img src={coins} alt="" className="coins"/> {title.coin.currentCoins}</td>
						<td>{title.rating.ratingLevel}</td>
					</tr>;
			});
		}
		return (

			<div className="adminPanel">
				<div className="heading"> <h2> User Details </h2></div>
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
									<table class="table table-hover table-bordered table-striped tab" cellspacing="0" width="100%">
										<thead>	
											<tr>
												<th>S.No</th>
												<th> User Name </th>
												<th> Unique Id</th>
												<th> Coins</th>
												<th> Rating</th>
											</tr>
										</thead>
										<tbody>
										{UserDetails}
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