import React, {Component} from 'react';
import {baseUrl} from './../helpers/envHelper';
import Message from './../include/Message';
import axios from 'axios';
import './CoinsOffer.css';
import Payment from './paypal';
import coins from './../assets/images/coins.svg';

class CoinsOffer extends Component {
constructor(props)
{
	super(props);
	this.state = {
		data : [],
		errorMessage : '',
		successMessage : ''
	}
}

 updateState = (errorMessage,successMessage) => {
  this.setState({
    errorMessage : errorMessage,
	successMessage : successMessage
  });
}

	componentWillMount(){
			var self = this;
			new Promise((resolve,reject) => {
						const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/coin-offers')
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

		componentDidMount(){
	      new Promise((resolve,reject) => {
	            const instance = axios.create({
	                timeout: 1000,
	                headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
	            });
	            instance.post(baseUrl + '/api/user-coin',{userid : localStorage.getItem('user-id')})
	              .then((response)=> {
	                  console.log(response.data.data[0].currentCoins);
	                  if(response.data.error === false)
	                  {
	                      localStorage.setItem('user-coin',response.data.data[0].currentCoins);
	                  }

	                  resolve();
	              });                
	          });
	    }

	
	render() {

		var offersList = this.state.data.map((title) => {
		var d = new Date(title.endDate);
		var validDate = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
			
		return <div className="col-md-4">
					<div className="offer">
						<label> valid till : {validDate}</label>
							<span> <img src={coins} alt="" /> {title.offerCoin}= Rs. {title.offerValue}</span>
							<Payment amount={title.offerValue} offerId={title.id} offerCoin ={title.offerCoin} updateState={this.updateState} />
					</div>
				</div>;
		});

		return (

			<div className="coinsoffer">
				<div className="coins-offer-heading"> 
					<h2> Coins Offer</h2>
				</div>
				<div className="container">
					<div className="mainbox">
						<Message message={this.state}/>
						<h3 className="best-deal"> Best Deal</h3>
						<div className="row">
							{offersList}
						</div>
					</div>
				</div>
			</div>

		);
	}
} 
export default  CoinsOffer;