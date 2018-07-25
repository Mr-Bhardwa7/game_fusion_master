import React, {Component} from 'react';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios'
import Message from './../include/Message';
import Sidebar from './AdminSidebar';
import './AdminAddCoin.css';

export default class AdminaddCoin extends Component{
constructor(props){
	super(props);
	this.state = {
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
					instance.get(baseUrl + '/api/offer')
					.then((response)=> {
						if(response.data.error === false)
							{
								console.log(response.data.data)
							}
							else {
								self.props.history.push('/login');
							}
						resolve();
					});
				
			});
	}

	createOffer = (offerCoin,offerValue,startDate,endDate) => {
		var self = this;
		 new Promise((resolve,reject) => {
					const instance = axios.create({
						  timeout: 1000,
						  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
					});
					instance.post(baseUrl + '/api/offer',{
						offerCoin: offerCoin,
						offerValue: offerValue,
						startDate: startDate,
						endDate: endDate
					})
					.then((response)=> {
						
						if(response.data.error===false)
						{
							self.setState({
								errorMessage : '',
								successMessage : response.data.message
							});

							document.getElementById('Reg_Coins').value = "";
							document.getElementById('Reg_offer').value = "";
							document.getElementById('Reg_start').value = "";
							document.getElementById('Reg_end').value = "";
						}
						else
						{
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

	validate_registration = (event) => {
		event.preventDefault();

		var Reg_Coins = document.getElementById('Reg_Coins');
		var Reg_Coins_msg = document.getElementById('Reg_Coins_msg');

		var Reg_offer = document.getElementById('Reg_offer');
		var Reg_offer_msg = document.getElementById('Reg_offer_msg');

		var Reg_start = document.getElementById('Reg_start');
		var Reg_start_msg = document.getElementById('Reg_start_msg');

		var Reg_end = document.getElementById('Reg_end');
		var Reg_end_msg = document.getElementById('Reg_end_msg');

		//Coins
		if(Reg_Coins.value==="")
		{
			Reg_Coins_msg.style.display="block";
			Reg_Coins_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter Coins";
			Reg_Coins.focus();
			return false;
		}
		else
		{
			Reg_Coins_msg.style.display="none";
			Reg_Coins_msg.innerHTML="";
		}
		var coins = /^[0-9]+$/;
		if(!Reg_Coins.value.match(coins))
			{
				Reg_Coins_msg.style.display="block";
				Reg_Coins_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter numbers only";
				Reg_Coins.focus();
				return false;
			}
		else
			{
				Reg_Coins_msg.style.display="none";
				Reg_Coins_msg.innerHTML="";
			}


		//offer
		if(Reg_offer.value==="")
		{
			Reg_offer_msg.style.display="block";
			Reg_offer_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter offer price";
			Reg_offer.focus();
			return false;
		}
		else
		{
			Reg_offer_msg.style.display="none";
			Reg_offer_msg.innerHTML="";
		}
		
		if(!Reg_offer.value.match(coins))
			{
				Reg_offer_msg.style.display="block";
				Reg_offer_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter numbers only";
				Reg_offer.focus();
				return false;
			}
		else
			{
				Reg_offer_msg.style.display="none";
				Reg_offer_msg.innerHTML="";
			}

			
		//Start date
		if(Reg_start.value==="")
		{
			Reg_start_msg.style.display="block";
			Reg_start_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter start date";
			Reg_start.focus();
			return false;
		}
		else
		{
			Reg_start_msg.style.display="none";
			Reg_start_msg.innerHTML="";
		}

		var startDate = new Date(Reg_start.value);
   		var today = new Date();
		var sDate = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()-1}`;
		var now = new Date(sDate);
		
		if(startDate <= now)
		{
			Reg_start_msg.style.display="block";
			Reg_start_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Selected date is not valid";
			Reg_start.focus();
			return false;
		}
		else
		{
			Reg_start_msg.style.display="none";
			Reg_start_msg.innerHTML="";
		}

		var endDate = new Date(Reg_end.value);
		//End Date
		if(Reg_end.value==="")
		{
			Reg_end_msg.style.display="block";
			Reg_end_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Please enter end date";
			Reg_end.focus();
			return false;
		}
		else
		{
			Reg_end_msg.style.display="none";
			Reg_end_msg.innerHTML="";
		}

		if(endDate <= now)
		{
			Reg_end_msg.style.display="block";
			Reg_end_msg.innerHTML="<i class='fa fa-exclamation-circle'></i> Selected date is not valid";
			Reg_end.focus();
			return false;
		}
		else
		{
			Reg_end_msg.style.display="none";
			Reg_end_msg.innerHTML="";
		}

		this.createOffer(event.target.offerCoin.value,event.target.offerValue.value,event.target.startDate.value,event.target.endDate.value)

	}

	

	render() {

		return (

			<div className="adminPanel">
				<div className="heading"> <h2> Add Offer Coins</h2></div>
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
						    	<div className="formheader">
						    		<h2> Add Coins Offer</h2>
						    		<form method="post" onSubmit={this.validate_registration}>
						    		<div className="row">
										<div className="col-md-3">
											<label> Coins : </label>
										</div>
										<div className="col-md-9">
											
										<div className="form-group">
											<input className="form-control" type="text"  id = "Reg_Coins" name="offerCoin" />
											<label className="control-label" id="Reg_Coins_msg"></label>
										</div>
						    		
										</div>
										<div className="col-md-3">
											<label> Offer Price : </label>
										</div>
										<div className="col-md-9">
											
										<div className="form-group">
											<input className="form-control" type="text" name="offerValue" id = "Reg_offer" />
											<label className="control-label" id="Reg_offer_msg"></label>
										</div>
						    		
										</div>

										<div className="col-md-3">
											<label> Staring Date : </label>
										</div>
										<div className="col-md-9">
											
										<div className="form-group">
											<input className="form-control" type="date" name="startDate" id = "Reg_start"/>
											<label className="control-label" id="Reg_start_msg"></label>
										</div>
						    		
										</div>

										<div className="col-md-3">
											<label> Ending Date : </label>
										</div>
										<div className="col-md-9">
											
										<div className="form-group">
											<input className="form-control" type="date" name="endDate" id = "Reg_end"/>
											<label className="control-label" id="Reg_end_msg"></label>
										</div>
						    		
										</div>

										<div className="col-md-3">
											
										</div>
										<div className="col-md-9">
											
										<div className="form-group">
											<input className="btn btn-primary" value="Add Offer"  type="submit" />
										</div>
						    		
										</div>
						    		</div>
						    		</form>
						    	</div>
						    </div>
						</div>
					</div>
				</div>
			</div>

		);
	}
}